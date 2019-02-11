import React, { Component } from 'react';
import axios from 'axios';
import TournamentSummary from './TournamentSummary'
import AddTourney from './AddTourney'
import './TournamentManager.css'


class TournamentManager extends Component {
    constructor() {
        super();

        this.state = {
            tournaments: [],
            date: '',
            name: '',
            location: '',
            entered: false,
            details: ''
        };
        
        this.createTourney = this.createTourney.bind(this);
        this.setEdit = this.setEdit.bind(this);
        this.updateTourney = this.updateTourney.bind(this)
        this.deleteTourney = this.deleteTourney.bind(this)
    };

    



    componentDidMount() {
        axios.get('/api/tournaments').then(res => {
            // console.log(res.data)
            this.setState({
                tournaments: res.data
            })
        })
    }

    // searchBar(){
    //     axios.get('/api/tournemnts').then(re)
    // }

    createTourney(date, name, location, details) {
        // console.log(date, name, location, details)
        axios.post('/api/tournament', {date, name, location, details}).then( res => { 
            // console.log(res.data)
            this.setState({
                tournaments: res.data,
                

            })
        })
    }

    deleteTourney(id){
        axios.delete(`/api/tournament/${id}`).then(res => {
            this.setState({
                tournaments: res.data
            })
        })
    }

    setEdit(date, name, location, details, id){
        // console.log(date, location, name, details)
        this.setState({
            date,
            name,
            location,
            details
        }, () => {
            // console.log(this.state);
            this.updateTourney(id)
        })
        //Jay helped me  callback function will fire once state is set
    }
    updateTourney = (id) => {
        const {date, name, location, details} = this.state;
        let obj = {
            date,
            location,
            name,
            details
        }
        console.log(id, obj)

        axios.put(`/api/tournament/${id}`, obj).then(
            res => {
                this.setState({
                    tournaments: res.data,
                    date: '',
                    name: '',
                    location: '',
                    details: ''
                })
            })
    }


    render() {
        const mappedTournaments = this.state.tournaments.map(tourney => {
            return (
            <TournamentSummary
            key={tourney.id}
            tourney={tourney}
            setEdit={this.setEdit}
            updateTourney={this.updateTourney}
            deleteTourney={this.deleteTourney}
            
            />
            )
        })
        return(
            <div className="TournamentManager">
           
            {mappedTournaments}

           <div className="add-tourney">
            <AddTourney createTourney={this.createTourney}
            />

            </div>
            
            </div>
        )
    }
}


export default TournamentManager;