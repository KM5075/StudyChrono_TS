import { ChakraProvider, Heading } from '@chakra-ui/react';
import theme from './theme/theme';
import { Button } from './components/ui/button';

function App() {
    return (
        <>
            <ChakraProvider value={theme}>
                <br />
                <Heading as="h1" fontSize="5xl" fontWeight="bold">Study Chrono</Heading>
                <br />
                <br />
                <br />
                <Button bg={"teal"}>Click me</Button>
            </ChakraProvider>
        </>
    );

}

export default App;