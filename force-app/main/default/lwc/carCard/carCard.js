import { LightningElement, wire } from 'lwc';

//Car_Information__c Schema
import NAME_FIELD from '@salesforce/schema/Car_Information__c.Name'
import PICTURE_URL_FIELD from '@salesforce/schema/Car_Information__c.Picture_URL__c'
import CATEGORY_FIELD from '@salesforce/schema/Car_Information__c.Category__c'
import MAKE_FIELD from '@salesforce/schema/Car_Information__c.Make__c'
import MSRP_FIELD from '@salesforce/schema/Car_Information__c.MSRP__c'
import CONTROL_FIELD from '@salesforce/schema/Car_Information__c.Control__c'
import FUEL_FIELD from '@salesforce/schema/Car_Information__c.Fuel_Type__c'
import SEATS_FIELD from '@salesforce/schema/Car_Information__c.Number_of_Seats__c'
import DESCRIPTION from '@salesforce/schema/Car_Information__c.Description__c'

// getFieldValue function is used to extract field values
import {getFieldValue} from 'lightning/uiRecordApi'
//lightning message service
import { subscribe, MessageContext, unsubscribe } from 'lightning/messageService'
import CARS_SELECTED from '@salesforce/messageChannel/CarSelected__c'
export default class CarCard extends LightningElement {
    //loading context
    @wire(MessageContext)
    messageContext
    //exposing fields to make them available in the template
    categoryField = CATEGORY_FIELD
    makeField = MAKE_FIELD 
    msrpField = MSRP_FIELD
    controlField = CONTROL_FIELD
    fuelField = FUEL_FIELD
    seatsField = SEATS_FIELD
    description = DESCRIPTION
   

    //Id of Car_Information__c to display data
    recordId

    // car fields displayed with specific format
    carName
    carPictureUrl
    //subscribe for the selected car
    carSelectionSubscription
    handleRecordLoaded(event){
        const {records} = event.detail
        const recordData = records[this.recordId]
        this.carName = getFieldValue(recordData, NAME_FIELD)
        this.carPictureUrl = getFieldValue(recordData, PICTURE_URL_FIELD)
    }
    connectedCallback(){
        this.subcribeHandler()
    }
    subcribeHandler(){
        this.carSelectionSubscription =subscribe(this.messageContext, CARS_SELECTED, (message)=>this.hanleCarSelected(message))

    }

hanleCarSelected(message){
    this.recordId = message.carId

}
disconnectedCallback(){
    unsubscribe(this.carSelectionSubscription)
    this.carSelectionSubscription = null

}
}
