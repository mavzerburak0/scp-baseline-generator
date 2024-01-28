import React, { useEffect, useState } from 'react';
import { FormControl, FormLabel, Input, Button, Box, RadioGroup, HStack, Checkbox, Select, IconButton } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import examplePolicies from './ExamplePolicies';

interface PolicyFormProps {
  onNameChange: (name: string) => void;
  onDescriptionChange: (description: string) => void;
  onTargetIdsChange: (targetIds: string[]) => void;
  onServicesChange: (services: string[]) => void;
  onActionsChange: (actions: string[]) => void;
  onStatementsChange: (statements: string[]) => void;
  onEffectChange: (effect: string) => void;
}

const PolicyForm: React.FC<PolicyFormProps> = ({
  onNameChange,
  onDescriptionChange,
  onTargetIdsChange,
  onServicesChange,
  onActionsChange,
  onStatementsChange,
  onEffectChange,
}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [targetIds, setTargetIds] = useState<string[]>([]);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [selectedActions, setSelectedActions] = useState<string[]>([]);
    const [statements, setStatements] = useState<string[]>([]);
    const [effect, setEffect] = useState('Deny');
    const services = ['IAM', 'S3', 'EC2', 'Organizations', 'KMS', 'CloudTrail', 'CloudWatch', 'Config', 'CloudFormation', 'CloudFront'];
    const actions = ['List', 'Get', 'Delete', 'All'];
    const [isExampleSelected, setIsExampleSelected] = useState(false);
    const [servicesVisible, setServicesVisible] = useState(true);
    const [actionsVisible, setActionsVisible] = useState(true);

    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption) {
            const selectedPolicy = examplePolicies[selectedOption] || {};
            setName(selectedPolicy.name || '');
            setDescription(selectedPolicy.description || '');
            setTargetIds(selectedPolicy.targetIds || []);
            setStatements(selectedPolicy.statements || []);
            setEffect(selectedPolicy.effect || 'Deny');
        
            // Update form values
            onNameChange(selectedPolicy.name || '');
            onDescriptionChange(selectedPolicy.description || '');
            onTargetIdsChange(selectedPolicy.targetIds || []);
            onStatementsChange(selectedPolicy.statements || []);
            onEffectChange(selectedPolicy.effect || 'Deny');
            setIsExampleSelected(true);
        } else {
            setIsExampleSelected(false);
        }
        
      };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newName = event.target.value;
        setName(newName);
        onNameChange(newName);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDescription = event.target.value;
        setDescription(newDescription);
        onDescriptionChange(newDescription);
    };

    const handleTargetIdsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTargetIds = event.target.value.split(',');
        setTargetIds(newTargetIds);
        onTargetIdsChange(newTargetIds);
    };

    const handleServiceClick = (service: string) => {
        const updatedServices = selectedServices.includes(service)
        ? selectedServices.filter((s) => s !== service)
        : [...selectedServices, service];

        setSelectedServices(updatedServices);
        onServicesChange(updatedServices);

    };

    const handleActionsClick = (action: string) => {
        const updatedActions = selectedActions.includes(action)
        ? selectedActions.filter((s) => s !== action)
        : [...selectedActions, action];

        setSelectedActions(updatedActions);
        onActionsChange(updatedActions);

    };

    const handleEffectChange = (newEffect: string) => {
        setEffect(newEffect);
        onEffectChange(newEffect);
    };

    const generateStatements = () => {
        if (selectedServices.length > 0 && selectedActions.length > 0) {
            const statements = selectedServices.flatMap((service) =>
                selectedActions.map((action) =>
                    action === 'All' ? `${service.toLowerCase()}:*` : `${service.toLowerCase()}:${action}*`
                )
            );
            setStatements(statements);
            onStatementsChange(statements);
        }
    };

    useEffect(() => {
        const statements = generateStatements();
    }, [selectedServices, selectedActions, isExampleSelected]);
  

    return (
        <form>
          <Box>
            <Box className='form-box'>
                <Select placeholder='Choose from examples' variant='flushed' onChange={(e) => handleSelectChange(e.target.value)}>
                    <option value='PreventCloudtrailDisable'>PreventCloudtrailDisable</option>
                    <option value='PreventLeavingOrg'>PreventLeavingOrg</option>
                    <option value='PreventGuardDutyDisable'>PreventGuardDutyDisable</option>
                </Select>
                <FormControl>
                    <FormLabel className='form-label'>Effect:</FormLabel>
                    <RadioGroup onChange={handleEffectChange} value={effect} mb={4} className='radio-group' defaultValue='Deny'>
                        <HStack spacing="40px" padding="0.5em">
                            <Checkbox
                                id="allow"
                                name="effect"
                                value="Allow"
                                isChecked={effect === 'Allow'}
                                onChange={() => handleEffectChange('Allow')}
                                disabled={isExampleSelected}
                            >Allow</Checkbox>
                            <Checkbox
                                id="deny"
                                name="effect"
                                value="Deny"
                                isChecked={effect === 'Deny'}
                                onChange={() => handleEffectChange('Deny')}
                                disabled={isExampleSelected}
                            >Deny</Checkbox>
                        </HStack>
                    </RadioGroup>
                    <Box className='form-single-input'>
                        <FormLabel className='form-label' marginRight="1rem">Policy name:</FormLabel>
                        <Input className='form-input' type="text" value={name} onChange={handleNameChange} size="md" disabled={isExampleSelected}/>
                    </Box>
                    <Box className='form-single-input'>
                        <FormLabel className='form-label' marginRight="1rem">Policy description:</FormLabel>
                        <Input className='form-input' type="text" value={description} onChange={handleDescriptionChange} size="md" disabled={isExampleSelected}/>
                    </Box>
                    <Box className='form-single-input'>
                        <FormLabel className='form-label' marginRight="1rem">Target IDs (comma separated):</FormLabel>
                        <Input className='form-input' type="text" value={targetIds} onChange={handleTargetIdsChange} size="md"/>
                    </Box>
                </FormControl>
            </Box>
            
            <Box className='services'>
                <p>Which services do you want to protect?</p>
                <Button onClick={() => setServicesVisible(!servicesVisible)}>
                    {servicesVisible ? <IconButton aria-label='Hide services' icon={<ChevronUpIcon />} /> : <IconButton aria-label='Show services' icon={<ChevronDownIcon />} />}
                </Button>
                {servicesVisible && (
                    <Box className='services-secondary'>
                        {services.map((service) => (
                            <Button
                                key={service}
                                disabled={isExampleSelected}
                                onClick={() => handleServiceClick(service)}
                                bg={selectedServices.includes(service) ? 'teal' : (isExampleSelected ? 'rgba(200, 130, 100, 0.500)' : '#213547')}
                                color="white"
                                className='service-button'
                                isDisabled={isExampleSelected}
                            >
                                {service}
                            </Button>
                        ))}
                    </Box>
                )}
            </Box>
            <Box className='actions'>
                <p>Which actions do you want to protect against?</p>
                <Button onClick={() => setActionsVisible(!actionsVisible)}>
                    {actionsVisible ? <IconButton aria-label='Hide actions' icon={<ChevronUpIcon />} /> : <IconButton aria-label='Show actions' icon={<ChevronDownIcon />} />}
                </Button>
                {actionsVisible && (
                    <Box className='actions-secondary'>
                        {actions.map((action) => (
                    <Button
                        key={action}
                        onClick={() => handleActionsClick(action)}
                        bg={selectedActions.includes(action) ? 'teal' : (isExampleSelected ? 'rgba(200, 130, 100, 0.500)' : '#213547')}
                        color="white"
                        className='action-button'
                        isDisabled={isExampleSelected}
                    >
                        {action}
                        </Button>
                    ))}
                    </Box>
                )}
                
            </Box>
          </Box>
          <br />
        </form>
      );
};

export default PolicyForm;