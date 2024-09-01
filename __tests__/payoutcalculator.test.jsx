import '@testing-library/jest-dom'
import { getByRole, queryAllByRole, render, screen } from '@testing-library/react'
import { PlayerForm } from '@/app/payout-calculator/PlayerForm'
import { userEvent } from '@testing-library/user-event'
import { waitFor } from '@testing-library/react';
import { submitForm } from  '../src/app/payout-calculator/page'
import Payout  from '../src/app/payout-calculator/page'
import { InvalidValueWarning } from '@/app/payout-calculator/InvalidValueWarning';
import { Results } from '@/app/payout-calculator/Results';
import { FormRow } from '@/app/payout-calculator/FormRow';
import { playerFormIsValid } from '../src/app/payout-calculator/page';
import * as payoutModule from '../src/app/payout-calculator/page';
import Deque from '@/app/Deque';


const mockSubmitForm = jest.fn();
const mockHandleInput = jest.fn();
const mockOnAddPlayerBtnClick = jest.fn();
const mockOnRemovePlayerBtnClick = jest.fn();
const handleInputChange = jest.fn();
const onRemovePlayerBtnClick = jest.fn();


/*
This VIDEO is great.
https://www.youtube.com/watch?v=FcHUPqKRvxQ
*/


describe('Player Form', () => {

    let players;

    beforeEach(() => {
        players = [
            {id: 1, name: 'James', buyIn: 2, cashOut: 2},
            {id: 2, name: 'Woodsy', buyIn: 2, cashOut: 2},
            {id: 3, name: 'Henry', buyIn: 2, cashOut: 2}
        ];

        render(<PlayerForm
            submitForm={mockSubmitForm}
            players={players}   
            handleInputChange={mockHandleInput}
            onAddPlayerBtnClick={mockOnAddPlayerBtnClick}
            onRemovePlayerBtnClick={mockOnRemovePlayerBtnClick}  
            />
        );

    });
    

    describe('Render', () => {

        it('should render a form with players', () => {
            

            //ACT
            const form = screen.getByTestId('player-form-item')
            const addPlayerBtns = screen.queryAllByRole('button', {name: "Add Player"}) 

            
            //ASSERT
            expect(form).toBeInTheDocument();
            expect(addPlayerBtns).toHaveLength(1);
            
        })

        it('Should render a remove button', () => {
            // render(<PlayerForm
            //     submitForm={mockSubmitForm}
            //     players={players}   
            //     handleInputChange={mockHandleInput}
            //     onAddPlayerBtnClick={mockOnAddPlayerBtnClick}
            //     onRemovePlayerBtnClick={mockOnRemovePlayerBtnClick}  
            //     />);
            const buttons = screen.queryAllByRole('button', {name: /Remove/i} )
            expect(buttons).toHaveLength(players.length);
        })        
    })


    
})


describe('Form Row', () => {

    const players = [
        {id: 1, name: 'James', buyIn: 2, cashOut: 2}
    ];

    describe('Form Row Exists', () => {
        render(<FormRow
            key={players[0].id}
            id={players[0].id}
            name={players[0].name}
            buyIn={players[0].buyIn}
            cashOut={players[0].cashOut}
            onInputChange={handleInputChange} 
            onRemovePlayerBtnClick={onRemovePlayerBtnClick}
            />)
        
        const name = screen.queryAllByRole('textbox', {value: players[0].name})
        const buyIn = screen.queryAllByPlaceholderText('Buy In', {value: players[0].buyIn})
        const cashOut = screen.queryAllByPlaceholderText('Cash Out', {value: players[0].cashOut})
        expect(name[0]).toBeInTheDocument();
        expect(buyIn[0]).toBeInTheDocument();
        expect(cashOut[0]).toBeInTheDocument();
        
    })

})
    

describe('Payout Component', ()=> {


    it('Renders invalid values component when results state set to False', () => {
        render(<Payout/>);
        const warningComp = screen.queryByTestId('payout-warning');
        expect(warningComp).not.toBeInTheDocument();

    });

    it('Renders results when totalBuyin is equal to totalCashout', () => {
        render(<Payout/>);
        const players = [
            {id: '1', name: 'Player 1', buyIn: 10, cashOut: 10},
            {id: '2', name: 'Player 2', buyIn: 10, cashOut: 10}
        ];

        const warningComp = screen.queryByTestId('payout-warning');
        expect(warningComp).not.toBeInTheDocument();
    })   

});

describe('isValidPlayerForm Fill', () => {

    test('When a player name is empty, playerFormValidity should be false', () => {
        const players = [
            {id: '1', name: 'Player 1', buyIn: 10, cashOut: 10},
            {id: '2', name: '', buyIn: 10, cashOut: 10}
    
        ];
    
        expect(playerFormIsValid(players)).toBe(false);

    });

    test('When a buyIn is empty, playerFormisValid returns false', () => {
        const players = [
            {id: '1', name: 'Player 1', buyIn: 10, cashOut: 10},
            {id: '2', name: 'Player 2', buyIn: '', cashOut: 10}
        ];
    
        expect(playerFormIsValid(players)).toBe(false);
    });

    test('When a cashOut is empty, playerFormisValid returns false', () => {
        const players = [
            {id: '1', name: 'Player 1', buyIn: 10, cashOut: 10},
            {id: '2', name: 'Player 2', buyIn: 10, cashOut: ''}
        ];
    
        expect(playerFormIsValid(players)).toBe(false);
    });

    test('When buy-in & cashOut values DO NOT match, the validator returns true', () => {
        const players = [
            {id: '1', name: 'Player 1', buyIn: 10, cashOut: 10},
            {id: '2', name: 'Player 2', buyIn: 10, cashOut: 11}
        ];
        expect(playerFormIsValid(players)).toBe(true);

    });

    test('When buy-in & cashOut values DO match, the validator returns true', () => {
        const players = [
            {id: '1', name: 'Player 1', buyIn: 10, cashOut: 10},
            {id: '2', name: 'Player 2', buyIn: 10, cashOut: 10}
        ];
        expect(playerFormIsValid(players)).toBe(true);

    });   

    test('When buy-in is less than 0, the validator returns false', () => {
        const players = [
            {id: '1', name: 'Player 1', buyIn: '-1', cashOut: 10},
            {id: '2', name: 'Player 2', buyIn: 10, cashOut: 10}
        ];
        expect(playerFormIsValid(players)).toBe(false);
    });   

    
    test('When cashout is less than 0, the validator returns false', () => {
        const players = [
            {id: '1', name: 'Player 1', buyIn: 10, cashOut: -1},
            {id: '2', name: 'Player 2', buyIn: 10, cashOut: 10}
        ];
        expect(playerFormIsValid(players)).toBe(false);
    });   
 
})

describe('totals are correctly updated', () => {

    it('Should correctly update the totals', () => {
        const players = [
            {id: '1', name: 'Player 1', buyIn: 12, cashOut: 12},
            {id: '2', name: 'Player 2', buyIn: 10, cashOut: 10}
        ];

        const { totalBuyIn, totalCashOut } = payoutModule.getTotals(players);
        expect(totalBuyIn).toBe(22);
        expect(totalCashOut).toBe(22);
    });

    it('Should correctly update the totals', () => {
        const players = [
            {id: '1', name: 'Player 1', buyIn: 200, cashOut: 12},
            {id: '2', name: 'Player 2', buyIn: 10, cashOut: 10}
        ];
            
        const { totalBuyIn, totalCashOut } = payoutModule.getTotals(players);
        expect(totalBuyIn).toBe(210);
        expect(totalCashOut).toBe(22);
    });
});


describe('Calculate Payouts Function', () => {

    it('sortPlayers correctly sorts by profit/loss, in desc order.', () => {

        const players = [
            {id: '2', name: 'Joe', buyIn: 10, cashOut: 8},
            {id: '1', name: 'Henry', buyIn: 10, cashOut: 12},
            {id: '3', name: 'Woodsy', buyIn: 10, cashOut: 10},
            {id: '4', name: 'James', buyIn: 200, cashOut: 1000}
            
            

        ];

        const playersSorted = payoutModule.sortPlayers(players);

    
        playersSorted.forEach((player, index, array) => {
            console.log(`${player.name} has a profit of ${player.profit}`);
            expect(player.profit).toBeGreaterThan((array.length -1 === index) ? player.profit - 1 : array[index+1].profit
            );
        });
        
        //expect total for each player 


    });

    test('the toDeque function correctly returns a deque', () => {
        const players = [
            {id: '2', name: 'Joe', buyIn: 10, cashOut: 8},
            {id: '1', name: 'Henry', buyIn: 10, cashOut: 12},
            {id: '3', name: 'Woodsy', buyIn: 10, cashOut: 10},
            {id: '4', name: 'James', buyIn: 200, cashOut: 1000}
        ];

        const playersDeque = payoutModule.toDeque(players);
        expect(playersDeque).toBeInstanceOf(Deque);
       
    });

    test('the playersDeque size is correct', () => {
        const players = [
            {id: '2', name: 'Joe', buyIn: 10, cashOut: 8},
            {id: '1', name: 'Henry', buyIn: 10, cashOut: 12},
            {id: '3', name: 'Woodsy', buyIn: 10, cashOut: 10},
            {id: '4', name: 'James', buyIn: 200, cashOut: 1000}
        ];

        const playersDeque = payoutModule.toDeque(players);
        expect(playersDeque.size()).toBe(4);
    });

    test('the removeRear removes element correctly', () => {
        const players = [
            {id: '2', name: 'Joe', buyIn: 10, cashOut: 8},
            {id: '1', name: 'Henry', buyIn: 10, cashOut: 12},
            {id: '3', name: 'Woodsy', buyIn: 10, cashOut: 10},
            {id: '4', name: 'James', buyIn: 200, cashOut: 1000}
        ];

        const playersDeque = payoutModule.toDeque(players);
        playersDeque.removeRear();
        expect(playersDeque.size()).toBe(3);
    });

    test('the removeRear also returns an element', () => {
        const players = [
            {id: '2', name: 'Joe', buyIn: 10, cashOut: 8},
            {id: '1', name: 'Henry', buyIn: 10, cashOut: 12},
            {id: '3', name: 'Woodsy', buyIn: 10, cashOut: 10},
            {id: '4', name: 'James', buyIn: 200, cashOut: 1000}
        ];

        const playersDeque = payoutModule.toDeque(players);
        const player = playersDeque.removeRear();
        expect(player.id).toBe('4');
    });

    test('the removeFront removes element correctly', () => {
        const players = [
            {id: '2', name: 'Joe', buyIn: 10, cashOut: 8},
            {id: '1', name: 'Henry', buyIn: 10, cashOut: 12},
            {id: '3', name: 'Woodsy', buyIn: 10, cashOut: 10},
            {id: '4', name: 'James', buyIn: 200, cashOut: 1000}
        ];

        const playersDeque = payoutModule.toDeque(players);
        playersDeque.removeFront();
        expect(playersDeque.size()).toBe(3);
    });

    test('the removeRear also returns an element', () => {
        const players = [
            {id: '1', name: 'Joe', buyIn: 10, cashOut: 8},
            {id: '2', name: 'Henry', buyIn: 10, cashOut: 12},
            {id: '3', name: 'Woodsy', buyIn: 10, cashOut: 10},
            {id: '4', name: 'James', buyIn: 200, cashOut: 1000}
        ];

        const playersDeque = payoutModule.toDeque(players);
        const player = playersDeque.removeFront();
        expect(player.id).toBe('1');
    });



});


describe('Determine Outcomes Algo', () => {
    test('Payments to be correct with whole number -> ', () => {
        const players = [
            {id: '1', name: 'George', buyIn: 10, cashOut: 15},
            {id: '2', name: 'Henry', buyIn: 10, cashOut: 12},
            {id: '3', name: 'Woodsy', buyIn: 10, cashOut: 9},
            {id: '5', name: 'James', buyIn: 10, cashOut: 8},
            {id: '4', name: 'Joe', buyIn: 10, cashOut: 6}
        ];

        const sortedPlayers = payoutModule.sortPlayers(players);
        const playersDeque = payoutModule.toDeque(sortedPlayers);
        payoutModule.determineOutcomes(playersDeque);

        console.log(payoutModule.payments);

        
        expect(payoutModule.payments).toContain('Joe owes £4 to George');
        expect(payoutModule.payments).toContain('James owes £1 to George');
        expect(payoutModule.payments).toContain('James owes £1 to Henry');
        expect(payoutModule.payments).toContain('Woodsy owes £1 to Henry');

    });

    test('Payments to be correct with decimals  -> ', () => {
        const players = [
            {id: '1', name: 'James W', buyIn: 10, cashOut: 14.15},
            {id: '2', name: 'George C', buyIn: 10, cashOut: 10.30},
            {id: '3', name: 'Henry', buyIn: 10, cashOut: 9.45},
            {id: '5', name: 'James K', buyIn: 13, cashOut: 17.65},
            {id: '6', name: 'Kier', buyIn: 15, cashOut: 4.70},
            {id: '7', name: 'Joe', buyIn: 10, cashOut: 0.2},
            {id: '8', name: 'Ben', buyIn: 10, cashOut: 15.35},
            {id: '9', name: 'Duncan', buyIn: 10, cashOut: 10.45},
            {id: '10', name: 'Ewan', buyIn: 10, cashOut: 15.75}
        ];

        const sortedPlayers = payoutModule.sortPlayers(players);
        const playersDeque = payoutModule.toDeque(sortedPlayers);
        payoutModule.determineOutcomes(playersDeque);

        console.log(payoutModule.payments);

        
        expect(payoutModule.payments).toContain('Henry owes £0.25 to Duncan');
        expect(payoutModule.payments).toContain('Henry owes £0.3 to George C');
        expect(payoutModule.payments).toContain('Kier owes £4.55 to Ben');
        expect(payoutModule.payments).toContain('Kier owes £5.75 to Ewan');
        expect(payoutModule.payments).toContain('Joe owes £0.8 to Ben');
        expect(payoutModule.payments).toContain('Joe owes £4.65 to James K');
        expect(payoutModule.payments).toContain('Joe owes £0.2 to Duncan');
        expect(payoutModule.payments).toContain('Joe owes £4.15 to James W');


    });



});
