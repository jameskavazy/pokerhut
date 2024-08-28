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
            {id: 1, name: 'James', buyIn: '2', cashOut: '2'},
            {id: 2, name: 'Woodsy', buyIn: '2', cashOut: '2'},
            {id: 3, name: 'Henry', buyIn: '2', cashOut: '2'}
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
        {id: 1, name: 'James', buyIn: '2', cashOut: '2'}
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
            {id: '1', name: 'Player 1', buyIn: '10', cashOut: '10'},
            {id: '2', name: 'Player 2', buyIn: '10', cashOut: '10'}
        ];

        const warningComp = screen.queryByTestId('payout-warning');
        expect(warningComp).not.toBeInTheDocument();
    })   

});

describe('isValidPlayerForm Fill', () => {

    test('When a player name is empty, playerFormValidity should be false', () => {
        const players = [
            {id: '1', name: 'Player 1', buyIn: '10', cashOut: '10'},
            {id: '2', name: '', buyIn: '10', cashOut: '10'}
    
        ];
    
        expect(playerFormIsValid(players)).toBe(false);

    });

    test('When a buyIn is empty, playerFormisValid returns false', () => {
        const players = [
            {id: '1', name: 'Player 1', buyIn: '10', cashOut: '10'},
            {id: '2', name: 'Player 2', buyIn: '', cashOut: '10'}
        ];
    
        expect(playerFormIsValid(players)).toBe(false);
    });

    test('When a cashOut is empty, playerFormisValid returns false', () => {
        const players = [
            {id: '1', name: 'Player 1', buyIn: '10', cashOut: '10'},
            {id: '2', name: 'Player 2', buyIn: '10', cashOut: ''}
        ];
    
        expect(playerFormIsValid(players)).toBe(false);
    });

    test('When buy-in & cashOut values DO NOT match, the validator returns true', () => {
        const players = [
            {id: '1', name: 'Player 1', buyIn: '10', cashOut: '10'},
            {id: '2', name: 'Player 2', buyIn: '10', cashOut: '11'}
        ];
        expect(playerFormIsValid(players)).toBe(true);

    });

    test('When buy-in & cashOut values DO match, the validator returns true', () => {
        const players = [
            {id: '1', name: 'Player 1', buyIn: '10', cashOut: '10'},
            {id: '2', name: 'Player 2', buyIn: '10', cashOut: '10'}
        ];
        expect(playerFormIsValid(players)).toBe(true);

    });   

    test('When buy-in is less than 0, the validator returns false', () => {
        const players = [
            {id: '1', name: 'Player 1', buyIn: '-1', cashOut: '10'},
            {id: '2', name: 'Player 2', buyIn: '10', cashOut: '10'}
        ];
        expect(playerFormIsValid(players)).toBe(false);
    });   

    
    test('When cashout is less than 0, the validator returns false', () => {
        const players = [
            {id: '1', name: 'Player 1', buyIn: '10', cashOut: '-1'},
            {id: '2', name: 'Player 2', buyIn: '10', cashOut: '10'}
        ];
        expect(playerFormIsValid(players)).toBe(false);
    });   
 
})

describe('totals are correctly updated', () => {

    it('Should correctly update the totals', () => {
        const players = [
            {id: '1', name: 'Player 1', buyIn: '12', cashOut: '12'},
            {id: '2', name: 'Player 2', buyIn: '10', cashOut: '10'}
        ];

        const { totalBuyIn, totalCashOut } = payoutModule.getTotals(players);
        expect(totalBuyIn).toBe(22);
        expect(totalCashOut).toBe(22);
    });

    it('Should correctly update the totals', () => {
        const players = [
            {id: '1', name: 'Player 1', buyIn: '200', cashOut: '12'},
            {id: '2', name: 'Player 2', buyIn: '10', cashOut: '10'}
        ];
            
        const { totalBuyIn, totalCashOut } = payoutModule.getTotals(players);
        expect(totalBuyIn).toBe(210);
        expect(totalCashOut).toBe(22);
    });
});

