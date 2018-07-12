export class AppSettings {

    public static get ONTOLOGY_ENDPOINT(): string {
        return 'https://consent-ontology.dsde-dev.broadinstitute.org';
    }

    public static get DAR_USERESTRICTION_ENDPOINT(): string {
        return 'https://consent.dsde-dev.broadinstitute.org/dar/restriction';
    }

    public static get PASSWORD(): string {
        return 'testpassword';
    }

    public static get USERNAME(): string {
        return 'testuser';
    }

}
