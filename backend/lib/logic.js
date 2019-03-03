/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/**
 * Sample transaction
 * @param {gridly.trade.Trade} Trade txn
 * @transaction
 */
async function Trade(txn) {
	//Logic to execute trade  
  const producer = txn.seller
  const consumer = txn.buyer
  const battery = txn.seller.battery
  
  //Decrease balance on buyer
  producer.balance += txn.totalPrice
  
  //Increase balance on seller
  consumer.balance -= txn.totalPrice
  
  //Decrease capacity of battery
  //Note: Used for testing purposes. In production the battery would update the current capacity in real-time
  producer.battery.currentCapacity -= txn.electricityQuantity
  
  // update the registries 
    const batteryRegistry = await getAssetRegistry('gridly.battery.Battery');
  const producerRegistry = await getParticipantRegistry('gridly.producer.Producer');
  const consumerRegistry = await getParticipantRegistry('gridly.consumer.Consumer');
    await producerRegistry.update(producer);
    await consumerRegistry.update(consumer);
    await batteryRegistry.update(battery);
}

/**
 * Information for testing
 * @param {gridly.trade.DemoSetup} demoSetup d
 * @transaction
 */
async function demoSetup(d) {
  const factory = getFactory();

  // create the producer
  const producer1 = factory.newResource('gridly.producer', 'Producer', 'producer1@email.com');
  producer1.fname = "Polly"
  producer1.lname = "Producci"
  producer1.homePhoneNo = "647-123-4567"
  producer1.mobilePhoneNo = "416-123-4567"
  producer1.accountStatus = "Producer"
  const producer1Address = factory.newConcept('gridly.user', 'Address');
  producer1Address.streetNo = 50
  producer1Address.streetName = "Essex Street"
  producer1Address.city = "London"
  producer1Address.postalCode = "N6G 5H6"
  producer1Address.province = "Ontario"
  producer1Address.country = "Canada"
  producer1.address = producer1Address
  
  producer1.consumerStatus = false
  producer1.greenButtonId = "1234"
  producer1.maxPurchasePrice = 20
  producer1.balance = 0
  
  producer1.producerStatus = true
  producer1.minSellingPrice = 10
  
  //create the battery
  const battery1 = factory.newResource('gridly.battery', 'Battery', 'B_001')
  battery1.serialNo = "123ABC"
  battery1.manufacturer = "Duracell"
  battery1.model = "Wall Battery Plus"
  battery1.maxCapacity = 200
  battery1.currentCapacity = 150
  var battery1Pointer = factory.newRelationship('gridly.battery', 'Battery', 'B_001')
  producer1.battery = battery1Pointer
  
  //create the consumer
  const consumer1 = factory.newResource('gridly.consumer', 'Consumer', 'consumer1@email.com');
  consumer1.fname = "Christian"
  consumer1.lname = "Consummate"
  consumer1.homePhoneNo = "647-456-7891"
  consumer1.mobilePhoneNo = "416-456-7891"
  consumer1.accountStatus = "Consumer"
  const consumer1Address = factory.newConcept('gridly.user', 'Address');
  consumer1Address.streetNo = 1190
  consumer1Address.streetName = "Western Road"
  consumer1Address.city = "London"
  consumer1Address.postalCode = "N6G 1N1"
  consumer1Address.province = "Ontario"
  consumer1Address.country = "Canada"
  consumer1.address = consumer1Address
  consumer1.consumerStatus = true
  consumer1.greenButtonId = "5678"
  consumer1.maxPurchasePrice = 15
  consumer1.balance = 75
  
  // add the batteries
    const batteryRegistry = await getAssetRegistry('gridly.battery.Battery');
    await batteryRegistry.addAll([battery1]);
  
  // add the producers
    const producerRegistry = await getParticipantRegistry('gridly.producer.Producer');
    await producerRegistry.addAll([producer1]);

// add the consumers
    const consumerRegistry = await getParticipantRegistry('gridly.consumer.Consumer');
    await consumerRegistry.addAll([consumer1]);
}