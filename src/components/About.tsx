import React from 'react';
import { Container } from '@chakra-ui/react';
import Header from './Navbar';

const About: React.FC = () => {
    return (
        <Container>
            <Header className='navbar' />
            <div>Coming soon</div>
        </Container>
    );
};

export default About;
