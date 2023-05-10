// package com.vttpfinalproject.backend.services;

// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.stereotype.Service;

// import com.twilio.Twilio;
// import com.twilio.rest.api.v2010.account.Message;
// import com.twilio.type.PhoneNumber;
// import com.vttpfinalproject.backend.models.TransactionDetail;

// @Service
// public class SmsService {
    
//     @Value("${spring.twilio.accountsid}")
//     private String twilioAccountSid;

//     @Value("${spring.twilio.token}")
//     private String twilioToken;

//     @Value("${spring.twilio.phone}")
//     private String twilioPhone;

//     public void sendSms(TransactionDetail tDetail) {
//         System.out.println("Sending sms");

//         Twilio.init(twilioAccountSid, twilioToken);
//         String messageBody = """
//                 Thank you for your purchase, your drinks will be with you shortly! - Drinks Factory
//                 """;

//         Message.creator(
//             new PhoneNumber(tDetail.getCustomer_phone()), 
//             new PhoneNumber(twilioPhone), 
//             messageBody).create();
            
//         System.out.println("SMS message sent!");
//     }

// }
