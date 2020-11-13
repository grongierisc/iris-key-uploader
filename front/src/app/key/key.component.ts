import { Component, OnInit } from '@angular/core';
import { IrisKeyService } from '../service/iris-key.service'
import { Key } from './key';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {
  key: Key = {
    decode: '\r\nProduct=Server\r\nLicense Type=Concurrent User\r\nServer=Single\r\nPlatform=IRIS Community\r\nLicensed Users=5\r\nLicensed Cores=8\r\nAuthorized Cores=8\r\nExtended feature codes=3A1F1800\r\n     Interoperability enabled.\r\n     BI User enabled.\r\n     BI Development enabled.\r\n     HealthShare enabled.\r\n     Analytics Run enabled.\r\n     Analytics Analyzer enabled.\r\n     Analytics Architect enabled.\r\n     NLP enabled.\r\n     HealthShare Foundation enabled.\r\n     Advanced Analytics enabled.\r\n     InterSystems IRIS enabled.\r\nNon-Production',
    customer: 'test'
  };
  constructor(
    private keyService: IrisKeyService,
  ) { }

  ngOnInit(): void {
    this.keyService.info().subscribe( key => {this.key = key})
  }

}
