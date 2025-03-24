

export const getDataForStation = async (name: string) => {
    try {
      if (!name) {
        throw new Error(`No data file found for param: ${name}`);
      }

      let trainScheduleData;

      switch (name.toLowerCase()) {
        case "dhaka":
          trainScheduleData = await import("../data/station/dhaka/data");
          break;
        case "cumilla":
          trainScheduleData = await import("../data/station/cumilla/data");
          break;
        default:
          throw new Error(`No data file found for param: ${name}`);
      }

      return trainScheduleData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };