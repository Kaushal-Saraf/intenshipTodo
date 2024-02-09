import { todoDocs } from "../models/user";

function sortArray(arr: todoDocs[]): todoDocs[] {
    return arr.sort((a, b) => {
        if (a.enddate === "" && b.enddate !== "") {
          return 1;
        } else if (a.enddate !== "" && b.enddate === "") {
          return -1;
        } else if (a.enddate === "" && b.enddate === "") {
          return 0;
        } else {
          return new Date(a.enddate).getTime() - new Date(b.enddate).getTime();
        }
      });
}
export default sortArray