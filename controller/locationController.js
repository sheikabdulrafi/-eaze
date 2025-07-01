import { District } from "../Schemas/districtSchema.js";
import { Mandal } from "../Schemas/mandalSchema.js";
import { Village } from "../Schemas/villageSchema.js";

// ✅ 1. Get all districts
export const getAllDistricts = async (req, res) => {
  try {
    const districts = await District.find().sort({ "Name of the District": 1 });
    res.status(200).json(districts);
  } catch (error) {
    console.error("❌ Failed to fetch districts:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ 2. Get district by district code
export const getDistrictByCode = async (req, res) => {
  const { districtCode } = req.body;
  if (!/^\d{2}$/.test(districtCode)) {
    return res.status(400).json({ message: "Invalid district code" });
  }

  try {
    const district = await District.findOne({ code: districtCode });
    if (!district) {
      return res.status(404).json({ message: "District not found" });
    }
    res.status(200).json(district);
  } catch (error) {
    console.error("❌ Error fetching district:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ 3. Get mandals by district code
export const getMandalsByDistrict = async (req, res) => {
  const { districtCode } = req.body;
  if (!/^\d{2}$/.test(districtCode)) {
    return res.status(400).json({ message: "Invalid district code" });
  }

  try {
    const mandals = await Mandal.find({
      Code: { $regex: `^${districtCode}` },
    }).sort({ "Name of the Mandal": 1 });

    res.status(200).json(mandals);
  } catch (error) {
    console.error("❌ Error fetching mandals:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ 4. Get villages by mandal code
export const getVillagesByMandal = async (req, res) => {
  const { mandalCode } = req.body;
  if (!/^\d{4}$/.test(mandalCode)) {
    return res.status(400).json({ message: "Invalid mandal code" });
  }

  try {
    const villages = await Village.find({
      code: { $regex: `^${mandalCode}` },
    }).sort({ village: 1 });

    res.status(200).json(villages);
  } catch (error) {
    console.error("❌ Error fetching villages:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ 5. Get mandal by village code
export const getMandalByVillageCode = async (req, res) => {
  const { villageCode } = req.body;
  if (!/^\d{6}$/.test(villageCode)) {
    return res.status(400).json({ message: "Invalid village code" });
  }

  const mandalCode = villageCode.slice(0, 4);
  try {
    const mandal = await Mandal.findOne({ Code: mandalCode });
    if (!mandal) {
      return res.status(404).json({ message: "Mandal not found" });
    }
    res.status(200).json(mandal);
  } catch (error) {
    console.error("❌ Error fetching mandal:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ 6. Get full location (district, mandal, village) by 6-digit code
export const getLocationByCode = async (req, res) => {
  const { code } = req.body;
  if (!/^\d{6}$/.test(code)) {
    return res.status(400).json({ message: "Invalid location code" });
  }

  const districtCode = code.slice(0, 2);
  const mandalCode = code.slice(0, 4);
  const villageCode = code;

  try {
    const [district, mandal, village] = await Promise.all([
      District.findOne({ code: districtCode }),
      Mandal.findOne({ Code: mandalCode }),
      Village.findOne({ code: villageCode }),
    ]);

    if (!district || !mandal || !village) {
      return res.status(404).json({
        message: "Location not found",
        missing: {
          district: !district,
          mandal: !mandal,
          village: !village,
        },
      });
    }

    res.status(200).json({
      district: district["Name of the District"]?.trim(),
      mandal: mandal["Name of the Mandal"]?.trim(),
      village: village.village?.trim(),
    });
  } catch (error) {
    console.error("❌ Error during location lookup:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
