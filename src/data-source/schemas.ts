export interface IData {
    serviceType: string;
    name: string;
    locationID: string;
    doctorID: string;
    chiName: string;
    address1: string;
    address2: string;
    location: string;
    region: string;
    chiAddress1: string;
    chiAddress2: string;
    chiLocation: string;
    chiRegion: string;
    telephone1: number | string;
    telephone2: number | string;
    daySeq1: string;
    daySeq1Time: string;
    daySeq2: string;
    daySeq2Time: string;
    daySeq3: string;
    daySeq3Time: string;
    daySeq4: string;
    daySeq4Time: string;
    chiDaySeq1: string;
    chiDaySeq1Time: string;
    chiDaySeq2: string;
    chiDaySeq2Time: string;
    chiDaySeq3: string;
    chiDaySeq3Time: string;
    chiDaySeq4: string;
    chiDaySeq4Time: string;
    price: string;
    partner: string;
    medicine: string;
}

export interface IArea {
    region: string;
    locations: string[];
}

export type Sequence = {days: string[], times: string};

export interface IDoctor {
    serviceTypes: string[];
    name: string;
    locationID: string;
    doctorID: string;
    address1: string;
    address2: string;
    location: string;
    region: string;
    telephones: string;
    sequences: Sequence[];
    price: string;
    partner: string;
    medicine: string;
}
