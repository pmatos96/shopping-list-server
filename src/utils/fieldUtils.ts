
type validateRequiredFieldsOutput = {
    valid: boolean,
    missingFields: Array<string>,
    errorMessage?: string
}

export default class FieldUtils {

    static validateRequiredFields = (fields: Array<{ name: string, value: any }>): validateRequiredFieldsOutput => {

        let missingFields = (fields || []).filter(field =>
            field.value === null || field.value === undefined || field.value === ""
        ).map(field => field.name);

        let errorMessage: string = "";

        if (missingFields.length > 0) {
            errorMessage = "Missing required fields: ";
            missingFields.forEach(field => {
                errorMessage += ("'" + field + "' ")
            })
        }

        return {
            valid: missingFields.length === 0,
            missingFields,
            errorMessage
        }
    }
}