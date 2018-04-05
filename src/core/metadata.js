
// The IDENTITY metadata contains zero columns
export const IDENTITY = {
    featureCount: 0,
    columns: []
};

/*
const metadataExample = {
    featureCount: 0,
    columns: [
        {
            name: 'temp',
            type: 'float',
            min: -10,
            max: 45,
            avg: 25,
            histogram: [3, 6, 10, 22, 21, 14, 2, 1],
            jenks3: [10, 20],
            jenks4: [8, 15, 22],
            jenks5: [7, 14, 18, 23],
            jenks6: [],
            jenks7: [],
        },
        {
            name: 'cat',
            type: 'category',
            categories: {
                10: {
                    name: 'red',
                    count: 10
                },
                11: {
                    name: 'blue',
                    count: 30
                },
                12: {
                    name: 'green',
                    count: 15
                }
            }
        }
    ]
};
*/

export default class Metadata {
    constructor(categoryIDs, columns, featureCount, sample) {
        this.categoryIDs = categoryIDs;
        this.columns = columns;
        this.featureCount = featureCount;
        this.sample = sample;
    }
}
