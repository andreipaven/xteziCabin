// bookingEmailTemplates.js

export const generateBookingConfirmationEmail = (reservation) => {
  return `
   <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #ddd; border-radius: 8px; font-family: Arial, sans-serif;">
  <tr>
    <td style="background-color: #2e8b57; color: #ffffff; padding: 20px; text-align: center;">
      <h2 style="margin: 0;">Rezervarea ta a fost confirmată!</h2>
    </td>
  </tr>
  <tr>
    <td style="padding: 20px; color: #333333;">
      <p>Bună, <strong>${reservation.name}</strong>,</p>
      <p>Îți mulțumim pentru rezervarea făcută la <strong>*****</strong>! Suntem bucuroși să te avem ca oaspete.</p>

      <h3 style="color: #2e8b57;">Detalii rezervare:</h3>
      <ul style="padding-left: 20px;">
        <li><strong>Cabana:</strong> *****</li>
        <li><strong>Data sosirii:</strong> ${reservation.startDate}</li>
        <li><strong>Data plecării:</strong> ${reservation.endDate}</li>
        <li><strong>Număr persoane:</strong> ${reservation.persons}</li>
        <li><strong>Total:</strong> ${reservation.price} RON</li>
      </ul>

<!--      <p>Dacă ai întrebări sau dorești să modifici rezervarea, ne poți contacta la <a href="http://localhost/contact" style="color: #2e8b57;">[Email Cabana]</a> sau la <strong>[Telefon]</strong>.</p>-->

      <p>Ne vedem în curând!</p>
      <p>Cu drag,<br><strong>Echipa *****</strong></p>
    </td>
  </tr>
</table>

  `;
};
