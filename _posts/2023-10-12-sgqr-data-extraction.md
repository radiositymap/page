---
layout: post
title:  "SGQR Data Extraction"
summary: "How to get information from SGQR to make transactions"
author: radiositymap
date: '2023-10-12'
category: ['qr']
thumbnail: /assets/img/posts/2023-10-12-qr.png
usemathjax: false
permalink: /blog/sgqr-data-extraction/
---

I was trying to make payments online but the only accepted payment methods were PayNow and other applications that I didn't have. I decided to parse the PayNow QR code and make a simple bank transfer using the PayNow protocol.

# SGQR

I found that my PayNow QR code was in [SGQR](https://www.mas.gov.sg/development/e-payments/sgqr) format, so I had to find a parser for that.

I first used a [normal QR parser](https://scanqr.org/) to get the data.

I then used [this SGQR parser](https://github.com/zionsg/sgqr-parser) by Zion to get the data in JSON. This tool is hosted [here](https://intzone.com/tools/sgqr).

With this tool, you can get a set of JSON data from the QR text data.

From the JSON data, you can get the transaction amount, merchant name and bill number, which are needed for your transaction.

```json
{
    "id": "54",
    "name": "Transaction Amount",
    "length": "04",
    "value": "XXXX",
    "comment": "Shall not be included if the app should prompt user to enter the amount to be paid to the Merchant."
},
{
    "id": "59",
    "name": "Merchant Name",
    "length": "25",
    "value": "XXXXXXXXXXXXXXXXXXXXXXXXX",
    "comment": ""
},
{
    "id": "60",
    "name": "Merchant City",
    "length": "10",
    "value": "XXXXXXXXXX",
    "comment": ""
},
{
    "id": "62",
    "name": "Additional Data Field Template",
    "length": "29",
    "value": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "comment": "",
    "dataObjects": [
        {
            "id": "01",
            "name": "Bill Number",
            "length": "25",
            "value": "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "comment": ""
        }
    ]
}
```

# PayNow

Finally, I had to parse some of the data manually because SGQR actually includes multiple payment protocols. The one I was using was PayNow. There is some data specific to the payment method, so the fields are not clear. This is what the data looks like.

```json
{
    "id": "26",
    "name": "Merchant Account Information",
    "length": "55",
    "value": "0009SG.PAYNOWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "comment": "Templates reserved for additional payment networks.",
    "dataObjects": [
        {
            "id": "00",
            "name": "Globally Unique Identifier",
            "length": "09",
            "value": "SG.PAYNOW",
            "comment": "Value can be one of the following - an Application Identifier (AID), a UUID without hyphens, a reverse domain name."
        },
        {
            "id": "01",
            "name": "Payment network specific",
            "length": "01",
            "value": "2",
            "comment": ""
        },
        {
            "id": "02",
            "name": "Payment network specific",
            "length": "10",
            "value": "XXXXXXXXXX",
            "comment": ""
        },
        {
            "id": "03",
            "name": "Payment network specific",
            "length": "01",
            "value": "0",
            "comment": ""
        },
        {
            "id": "04",
            "name": "Payment network specific",
            "length": "14",
            "value": "XXXXXXXXXXXXXX",
            "comment": ""
        }
    ]
}
```

There is a pretty clear description of the PayNow fields [here](https://github.com/VirgilZhao/paynow#data-structure-of-the-generate-qr-code-string-content).

Here we can see five fields, four which are unidentified. According to the description, they are:

1. a static value

2. account type (mobile or UEN)

3. UEN

4. whether or not you can edit the amount paid

5. expiry date

All I need from here is the UEN, and perhaps the expiry date to know how quickly I have to parse the data. I haven't tried the mobile one so I don't know how that would work.

# Transaction Data

In essence, what I needed for my transaction was the merchant name, UEN, transaction amount and the bill number. I couldn't fit the full merchant name into my transation form but my transaction went through so that seems to be fine.
