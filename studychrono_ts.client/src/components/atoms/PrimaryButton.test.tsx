import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PrimaryButton from "./PrimaryButton";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

describe('PrimaryButton', () => {
    const buttonText = 'Click me';
    const commonFunction = () => {
        console.log('Hello world!');
    };

    it('should render', async () => {
        render(
            <ChakraProvider value={defaultSystem}>
                <PrimaryButton onClick={commonFunction}>{buttonText}</PrimaryButton>
            </ChakraProvider>
        );
        expect(screen.getByText(buttonText)).toBeInTheDocument();
        screen.debug();
    });

    // TODO: メソッドのテストを追加
});