import { IArea, IData, IDoctor, Sequence } from './schemas';

const PAGE_SIZE = 8;

export class Service {
    data: IDoctor[];
    
    constructor(_data: IData[]) {
        this.data = _data.map((item: IData) => {
            return {
                ...item,
                serviceTypes: item.serviceType.split('/'),
                sequences: this.mergeSequences([
                    {days: item.daySeq1, times: item.daySeq1Time},
                    {days: item.daySeq2, times: item.daySeq2Time},
                    {days: item.daySeq3, times: item.daySeq3Time},
                    {days: item.daySeq4, times: item.daySeq4Time}
                ]),
                telephones: this.mergeTelephones([item.telephone1, item.telephone2]),
            }
        });
    }

    private mergeTelephones = (items:[string | number, string | number]) => {
        const result = [];
        for (const key in items) {
            if(items[key])
                result.push(...items[key].toString().replaceAll(' ', '').split(/\//));
        }
        return result.join(', ');
    }

    private mergeSequences = (sequences: {days: string, times: string}[]) => {
        const result: Sequence[] = []; 
        for (const key in sequences) {
            const sequence = sequences[key];
            if(sequence.days || sequence.times)
                result.push({
                    days: this.splitAndReplaceDaySeq(sequence.days),
                    times: this.adjustDaySeqTime(sequence.times)
                });
        }
        return result;
    }

    private splitAndReplaceDaySeq = (value: string) => { 
        const daySequence: { [key: string]: string } = {
            'Mon':   "Monday",
            'Tue':   "Tuesday",
            'Wed':   "Wednesday",
            'Thu':   "Thursday",
            'Thur':  "Thursday",
            'Thus':  "Thursday",
            'Thurs': "Thursday",
            'Fri':   "Friday",
            'Sat':   "Saturday",
            'Sun':   "Sunday",
            'PH':    "Public Holiday"
        };

        if(value)
            return value.replaceAll(' ', '').split(/,|&|\/|-/).map(x => daySequence[x]);
        return [];
    }

    private adjustDaySeqTime = (value: string) => { 
        if(value)
            return value.replaceAll(' ', '').split(/;|,|,|&/).join(', ');
        return '';
    }


    getServiceTypes = () => {
        return this.data.map(x=> x.serviceTypes).reduce(function(result, current) {
            return [...new Set([...result, ...current])]
        });
    }

    getAreas = () => {
        const areas: IArea[] = [];
        const regions = [...new Set(this.data.map(item => item.region))];
        for (const key in regions) {
            const region = regions[key];
            const locations = [...new Set(this.data.filter(x=> x.region === region).map(item => item.location))];
            areas.push({
                region: region,
                locations: locations
            })
        }

        return areas;
    }

    retrieveData = (page: number, filter: {
        serviceTypes: string[] | null,
        region: string | null,
        locations: string[] | null,
    }) => {
        let filtered_data = this.data;
        if(filter.serviceTypes && filter.serviceTypes?.length > 0)
            filtered_data = filtered_data.filter(x=> x.serviceTypes.some(y=> filter.serviceTypes?.includes(y)));

        if(filter.region)
            filtered_data = filtered_data.filter(x=> x.region === filter.region);

        if(filter.locations && filter.locations?.length > 0)
            filtered_data = filtered_data.filter(x=> filter.locations?.includes(x.location));

        const total_items = filtered_data.length;
        const pages = Math.ceil(total_items/PAGE_SIZE);

        const from = (page - 1) * PAGE_SIZE;
        const to = (page * PAGE_SIZE) < total_items ? page * PAGE_SIZE : total_items;
        const result = filtered_data.slice(from, to);

        return {
            items: result,
            pages: pages
        }
    }
}
