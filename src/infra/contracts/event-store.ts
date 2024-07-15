import { EventStoreDBClient } from "@eventstore/db-client";

export async function createEventStore() {
    const client = new EventStoreDBClient({
        endpoint: "localhost:2113",
    })

    return client;
}  