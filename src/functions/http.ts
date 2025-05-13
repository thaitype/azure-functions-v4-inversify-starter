import { app } from "@azure/functions";
import { injector } from "@di-extra/inversify";
import { container } from "../container";
import { DataService } from "../services/data.service";

// prettier-ignore
const services = injector(container)
  .inject('dataService', DataService).to<DataService>()
  .resolve();

app.http('http', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: (request, context) => {
    return {
      body: 'Hello, world!' + services.dataService.getData(),
    }
  }
});
