import '@testing-library/jest-dom'
import { getByRole, queryAllByRole, render, screen } from '@testing-library/react'
import { PlayerForm } from '@/app/payout-calculator/PlayerForm'
import { userEvent } from '@testing-library/user-event'
import { FormRow } from '@/app/payout-calculator/FormRow';
import { waitFor } from '@testing-library/react';
import { submitForm } from  '../src/app/payout-calculator/page'

const mockSubmitForm = jest.fn();
const mockHandleInput = jest.fn();
const mockOnAddPlayerBtnClick = jest.fn();
const mockOnRemovePlayerBtnClick = jest.fn();
const handleInputChange = jest.fn();
const onRemovePlayerBtnClick = jest.fn();



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
    

describe('submitForm', ()=> {
    let setResults;
    let setValues;
    let players;

    beforeEach(() => {
        setResults = jest.fn();
        setValues = jest.fn();
        players = [
            {id: 1, name: 'James', buyIn: '10', cashOut: '10'},
            {id: 2, name: 'Woodsy', buyIn: '10', cashOut: '12'}
            
        ];
    });

    it('sets results to false, if player name is empty', () => {
        players[0].name = '';
        submitForm();
        expect(setResults).toHaveBeenCalledWith(false);
    });


});