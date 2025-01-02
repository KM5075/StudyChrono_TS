import { Button, ChakraProvider, Heading } from '@chakra-ui/react';
import theme from './theme/theme';
import PrimaryButton from './components/atoms/PrimaryButton';

function App() {
    return (
        <>
            <ChakraProvider value={theme}>
                <br />
                <Heading as="h1" fontSize="5xl" fontWeight="bold">Study Chrono</Heading>
                <br />
                <br />
                <br />Button, 
                <Button bg={"teal"}>Click me</Button>
                <PrimaryButton>Click me primary</PrimaryButton>
            </ChakraProvider>
        </>
    );

}

export default App;