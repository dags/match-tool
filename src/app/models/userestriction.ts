export interface UseRestriction {
    type: string;
    operands?: UseRestriction[];
    operand?: UseRestriction;
    name?: string;
}
