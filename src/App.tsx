import { useState, useEffect } from 'react'
import './App.css'
import PolicyForm from './components/PolicyForm';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  Container,
  IconButton,
  Box,
  Button,
} from '@chakra-ui/react';
import { CloseIcon, AddIcon } from '@chakra-ui/icons';
import Header from './components/Navbar';
import { CopyBlock, a11yDark } from 'react-code-blocks';
import { saveAs } from 'file-saver';


const App: React.FC = () => {
  const [policies, setPolicies] = useState<{ name: string; description: string; targetIds: string[]; services: string[], actions: string[], statements: string[], effect: string, actionChoice: string, resources: string[], conditions: string[] }[]>([
    { name: '', description: '', targetIds: [], services: [], actions: [], statements: [], effect: '', actionChoice: '', resources: ["*"], conditions: []},
  ]);
  const [concatenatedPoliciesTerraform, setConcatenatedPoliciesTerraform] = useState<string>('');
  const [concatenatedPoliciesCloudformation, setConcatenatedPoliciesCloudformation] = useState<string>('');
  const [preWrittenCloudformation] = useState<string>(`
AWSTemplateFormatVersion: '2010-09-09'
Description: "Generated by SCP Baseline Generator"

Resources:`);
  const concatenatedCloudformation = `${preWrittenCloudformation}${concatenatedPoliciesCloudformation}`;
  const showLineNumbers = true;

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, filename);
  };

  const handleNameChange = (name: string, index: number) => {
    setPolicies((prevPolicies) => {
      const newPolicies = [...prevPolicies];
      newPolicies[index].name = name;
      return newPolicies;
    });
  };

  const handleDescriptionChange = (description: string, index: number) => {
    setPolicies((prevPolicies) => {
      const newPolicies = [...prevPolicies];
      newPolicies[index].description = description;
      return newPolicies;
    });
  };

  const handleTargetIdsChange = (targetIds: string[], index: number) => {
    setPolicies((prevPolicies) => {
      const newPolicies = [...prevPolicies];
      newPolicies[index].targetIds = targetIds;
      return newPolicies;
    });
  };

  const handleResourcesChange = (resources: string[], index: number) => {
    setPolicies((prevPolicies) => {
      const newPolicies = [...prevPolicies];
      newPolicies[index].resources = resources;
      return newPolicies;
    });
  };

  const handleConditionsChange = (conditions: string[], index: number) => {
    setPolicies((prevPolicies) => {
      const newPolicies = [...prevPolicies];
      newPolicies[index].conditions = conditions;
      return newPolicies;
    });
  };

  const handleServicesChange = (services: string[], index: number) => {
    setPolicies((prevPolicies) => {
      const newPolicies = [...prevPolicies];
      newPolicies[index].services = services;
      return newPolicies;
    });
  };

  const handleActionsChange = (actions: string[], index: number) => {
    setPolicies((prevPolicies) => {
      const newPolicies = [...prevPolicies];
      newPolicies[index].actions = actions;
      return newPolicies;
    });
  };

  const handleStatementsChange = (statements: string[], index: number) => {
    setPolicies((prevPolicies) => {
      const newPolicies = [...prevPolicies];
      newPolicies[index].statements = statements;
      return newPolicies;
    });
  }

  const handleEffectChange = (effect: string, index: number) => {
    setPolicies((prevPolicies) => {
      const newPolicies = [...prevPolicies];
      newPolicies[index].effect = effect;
      return newPolicies;
    });
  }

  const handleActionChoiceChange = (actionChoice: string, index: number) => {
    setPolicies((prevPolicies) => {
      const newPolicies = [...prevPolicies];
      newPolicies[index].actionChoice = actionChoice;
      return newPolicies;
    });
  }

  const removePolicyForm = (index: number) => {
    setPolicies((prevPolicies) => prevPolicies.filter((_, i) => i !== index));
  };

  useEffect(() => {
    
    const generatedText = policies
      .map(({ name, description, targetIds, statements, effect, actionChoice, resources }) => {
        return `
    ${name}SCP:
      Type: AWS::Organizations::Policy
      Properties:    
        TargetIds: [${targetIds.map((id) => `"${id}"`).join(', ')}]
        Name: ${name}
        Description: ${description}
        Type: SERVICE_CONTROL_POLICY
        Content: >-
          {
          "Version": "2012-10-17",
          "Statement": [
              {
                  "Effect": ${effect ? `"${effect}"` : `"Deny"`},
                  ${actionChoice ? `"${actionChoice}"` : `"Action"`}: [${statements.map((statement) => `"${statement}"`).join(',\n                        ')}],
                  "Resource": [${resources.length > 0 ? resources.map((resource) => `"${resource}"`).join(',\n                        ') : '"*"'}]
              }
            ]
          }`;
      })
      .join('');

    setConcatenatedPoliciesCloudformation(generatedText);
  }, [policies]);

  useEffect(() => {
    
    const generatedTerraform = policies
      .map(({ name, description, statements, effect, actionChoice, resources }) => {
        return `\ndata "aws_iam_policy_document" "${name}" {
statement {
  effect    = ${effect ? `"${effect}"` : `"Deny"`}
  ${actionChoice === 'NotAction' ? 'not_actions' : 'actions'}   = [${statements.map((statement) => `"${statement}"`).join(',\n              ')}]
  resources = [${resources.length > 0 ? resources.map((resource) => `"${resource}"`).join(',\n              ') : '"*"'}]
  }
}

resource "aws_organizations_policy" "example" {
name        = "${name}"
content     = data.aws_iam_policy_document.${name}.json
description = "${description}"
type        = "SERVICE_CONTROL_POLICY"
}`;
      })
      .join('');

    setConcatenatedPoliciesTerraform(generatedTerraform);
  }, [policies]);

  const addPolicyForm = () => {
    setPolicies((prevPolicies) => [...prevPolicies, { name: '', description: '', targetIds: [], services: [], actions: [], statements: [], effect: '', actionChoice: '', resources: [], conditions: []}]);
  };

  return (
    <Container className='App'>
      <Header className='navbar' />
      <Container maxW="container.xl" p={4} display="flex">
        <div className='left-column'>
          <Tabs isFitted>
            <TabList mb="1em" className='tab-list'>
              {policies.map((_, index) => (
                <Tab key={index}>
                  Policy {index + 1}
                  <IconButton aria-label="Close" fontSize="10px" icon={<CloseIcon />} onClick={() => removePolicyForm(index)} ml={5} />
                </Tab>
              ))}
              <Tab onClick={addPolicyForm}><AddIcon /></Tab>
            </TabList>
            <TabPanels>
              {policies.map((nameObj, index) => (
                <TabPanel key={index}>
                  <VStack spacing={4} align="left">
                    <PolicyForm
                      onNameChange={(newName) => handleNameChange(newName, index)}
                      onDescriptionChange={(newDescription) => handleDescriptionChange(newDescription, index)}
                      onTargetIdsChange={(newTargetIds) => handleTargetIdsChange(newTargetIds, index)}
                      onServicesChange={(newServices) => handleServicesChange(newServices, index)}
                      onActionsChange={(newActions) => handleActionsChange(newActions, index)}
                      onStatementsChange={(newStatements) => handleStatementsChange(newStatements, index)}
                      onEffectChange={(newEffect) => handleEffectChange(newEffect, index)}
                      onActionChoiceChange={(newActionChoice) => handleActionChoiceChange(newActionChoice, index)}
                      onResourcesChange={(newResources) => handleResourcesChange(newResources, index)}
                      onConditionsChange={(newConditions) => handleConditionsChange(newConditions, index)}
                    />
                  </VStack>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </div>
        
        <div className='right-column'>
          <Tabs isFitted>
            <TabList mb="1em" >
                <Tab>
                  Cloudformation
                </Tab>
                <Tab>
                  Terraform
                </Tab>
              
            </TabList>
            <TabPanels>
                <TabPanel >
                  <Button onClick={() => downloadFile(concatenatedCloudformation, 'scp.yaml')}>
                    Download CloudFormation
                  </Button>
                  <Box className='right-column-box terraform-box'>
                    <CopyBlock
                      {...{ showLineNumbers }}
                      text={concatenatedCloudformation}
                      theme={a11yDark}
                      language="terraform"
                      customStyle={{
                        overflowY: 'scroll',
                        borderRadius: '5px',
                        boxShadow: '1px 2px 3px rgba(0,0,0,0.35)',
                        fontSize: '0.9rem',
                        margin: '0px 0.75rem',
                      }}
                    />
                  </Box>
                </TabPanel>
                <TabPanel >
                  <Button onClick={() => downloadFile(concatenatedPoliciesTerraform, 'main.tf')}>
                    Download Terraform
                  </Button>
                  <Box className='right-column-box terraform-box'>
                    <CopyBlock
                      {...{ showLineNumbers }}
                      text={concatenatedPoliciesTerraform}
                      theme={a11yDark}
                      language="terraform"
                      customStyle={{
                        overflowY: 'scroll',
                        borderRadius: '5px',
                        boxShadow: '1px 2px 3px rgba(0,0,0,0.35)',
                        fontSize: '0.9rem',
                        margin: '0px 0.75rem',
                      }}
                    />
                  </Box>
                </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </Container>
    </Container>
    
      
  );
};

export default App;



