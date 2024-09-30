import { payments } from "@/app/payout-calculator/page";
import { parse } from "./parse";

export function determineOutcomes(playersDeque) {

    if (playersDeque.isEmpty()) return;
    
    const frontProfit = parse(playersDeque.getFront().profit);
    const rearProfit = parse(playersDeque.getRear().profit);

    if (rearProfit < frontProfit) {
        //POP last,  last pays off whole debt to front. 
        const last = playersDeque.removeRear();

        // Update Front's profit
        const front = playersDeque.getFront();
        front.profit -= parse(last.profit);        

        //record transaction
        payments.push(`${last.name} owes £${parse(last.profit)} to ${front.name}`);

    } else if (rearProfit > frontProfit) {
        //Pop First is paid off completely,
        const first = playersDeque.removeFront();
        // update last
        const last = playersDeque.getRear();
        last.profit += parse(first.profit);
        payments.push(`${last.name} owes £${parse(first.profit)} to ${first.name}`);

    } else {
        //equal 
        // pop both, now zero.
        const first = playersDeque.removeFront();
        const last = playersDeque.removeRear();

        // payments.push(`${first.name} receives £${last.profit} from ${last.name}`);
        payments.push(`${last.name} owes £${parse(last.profit)} to ${first.name}`);

    }

    determineOutcomes(playersDeque);
}
