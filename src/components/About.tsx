import React from 'react';
import { Container, Text } from '@chakra-ui/react';
import Header from './Navbar';

const About: React.FC = () => {
    return (
        <Container>
            <Header className='navbar' />
            <div>
                <Text className='about'>
                    Inspired by an <a href="https://summitroute.com/blog/2021/02/16/aws_security_project_ideas/">idea</a> from Scott Piper (@0xdabbad00 on Twitter), this tool is built to help you generate baseline SCPs for your AWS accounts 
                    in the form of CloudFormation/terraform templates. Choose from pre-existing templates or create your own! You can add as many policies as you want. 
                    You'd probably want to create a module or use an existing one for terraform though. 
                    <br></br>
                    <br></br>
                    Source code is available <a href="https://github.com/mavzerburak0/scp-baseline-generator">here</a>.
                    It's not pretty and I'm not proud of it, but it works. I will refactor it when I have time.
                    I just wanted to put this out there as soon as possible. Otherwise, I would have never finished it.
                    Hopefully someone can find it useful.
                    <br></br>
                    <br></br>
                    As you can see, there are many missing features (e.g. conditions, adding your own statements) and probably many bugs. Please feel free to create a pull request
                    if you want to contribute. I would be more than happy to accept it. Otherwise, I will get to them eventually.
                    <br></br>
                    <br></br>
                    Follow me on <a href="https://www.linkedin.com/in/kadirburakmavzer/">LinkedIn</a>! 
                </Text> 
            </div>
        </Container>
    );
};

export default About;
