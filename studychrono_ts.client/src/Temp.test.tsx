import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Temp from "./Temp";

/*
 * �T���v���e�X�g
 */
describe("�T���v���e�X�g", () => {
    test("[����n]�T���v���e�X�g", async () => {
        // ���s
        render(<Temp />);

        // ����
        expect(screen.getByText("Hello world! aaa")).toBeInTheDocument();
    });
});
