export class ShouldIBuyAGASpecification {
  isSatisifiedBy(monthlyGAAverage: number, monthlyTicketAverage: number) {
    return monthlyTicketAverage >= monthlyGAAverage;
  }
}
