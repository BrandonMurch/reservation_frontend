import { enumeration } from 'shared/helpers';

const types = enumeration.singleValue('EDITBOOKING', 'EDITUSER', 'DELETE', 'LOADING', 'CREATE', 'FORCIBLE');

export default types;
