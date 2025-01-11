import axios from "axios";
import { StudyRecord } from "../types/api/StudyRecord";

export const getStudyRecords = async (): Promise<StudyRecord[]> => {
    let result: StudyRecord[] = [];
    await axios.get("/api/studyrecord").then((res) => {
        // console.log(res.data);
        res.data[1].title = "React-mock-test";
        result = res.data;
    });
    return result
};
