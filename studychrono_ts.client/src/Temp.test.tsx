import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Temp from "./Temp";

/*
 * サンプルテスト
 */
describe("サンプルテスト", () => {
    test("[正常系]サンプルテスト", async () => {
        // 実行
        render(<Temp />);

        // 検証
        expect(screen.getByText("Hello world! aaa")).toBeInTheDocument();
    });
});
