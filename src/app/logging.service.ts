import { Injectable } from '@angular/core';

export class LoggingService {
    lastlog: string;

    printLog(message: string) {
        this.lastlog = message;
    }
}