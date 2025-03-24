

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

  export const getDataForRoute = async (route: string) => {
    try {
      if (!route) {
        throw new Error(`No data file found for param: ${route}`);
      }

      let trainScheduleData: any = [];

      switch (route.toLowerCase()) {
        case "dhaka-to-brahmanbaria":
          trainScheduleData = await import("../data/route/dhaka-to-brahmanbaria/data");
          break;
        case "dhaka-to-narshindi":
          trainScheduleData = await import("../data/route/dhaka-to-narshindi/data");
          break;
        default:
          break;
      }

      return trainScheduleData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };