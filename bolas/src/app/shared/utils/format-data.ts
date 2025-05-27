export class FormatData {
    
  constructor() {

  }

  public generateGoogleMapsSearchUrl(address: string): string {
    const baseUrl = "https://www.google.com/maps/search/";
    const formattedAddress = encodeURIComponent(address.trim()).replace(/%20/g, "+");
    return `${baseUrl}${formattedAddress}`;
  }

  public formatReadableDateCreation(dateString: string): string {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };

    return date.toLocaleString('es-ES', options);
  }

  public formatReadableDate(dateString: string): string {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };

    return date.toLocaleString('es-ES', options);
  }

}