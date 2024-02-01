import { Container } from '@chakra-ui/react';
import Header from './Navbar';
import React from 'react';

const Examples: React.FC = () => {
    return (
        <Container>
            <Header className='navbar' />
            <div>Coming soon</div>
        </Container>
    );
};

export default Examples;
