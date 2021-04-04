export class TypeConvert {

    // Variables declaration:
    private timezoneOffset: number | undefined;
    private dateTimeInString: string | undefined;

    public convertDateTimeToString (dateTimeInput: Date): string {
        this.timezoneOffset = dateTimeInput.getTimezoneOffset ();
        dateTimeInput.setMinutes (
                dateTimeInput.getMinutes () - this.timezoneOffset
        );
        this.dateTimeInString = dateTimeInput.toISOString ().slice (0, -5);
        return this.dateTimeInString;
    } 
}