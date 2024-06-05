const { Client } = require('@elastic/elasticsearch');
const ELASTICSEARCH_URL = "http://127.0.0.1:9200";
const client = new Client({ node: ELASTICSEARCH_URL });

const phraseSearch = async (_index, _type, phrase) => {
    const hits = [];

    try {
        const searchResult = await client
            .search({
                index: 'bank', body: {
                    query: {
                        multi_match: {
                            query: phrase.toLowerCase(),
                            fields: [
                                "firstname",
                                "lastname",
                                "gender",
                                "employer",
                                "email",
                                "city",
                                "state",
                                "address",
                            ],
                            type: "phrase_prefix",
                        }
                    }
                }
            });

        if (
            searchResult &&
            searchResult.hits &&
            searchResult.hits.hits &&
            searchResult.hits.hits.length > 0
        ) {
            hits.push(...searchResult.hits.hits);
        }

    } catch (e) {
        console.log('Error', e);
    }

    return {
        hitsCount: hits.length,
        hits,
    };
};

module.exports = {
    phraseSearch
};
