export class KafkaPayload<T> {
 
    magicByte:number;
    attributes:number;
    timestamp: string;
    offset: string;
    value: T;
    headers: Record<string, any>;
    isControlRecord: boolean;
    batchContext: Record<string, any>;
    topic: string;
    partition: number;
    key: string  
  }