import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  username = '';
  welcomeMessage = '';

  constructor(private route: ActivatedRoute, private welcomeDataService: WelcomeDataService) { }

  ngOnInit() {
    this.username = this.route.snapshot.params['name'];
  }

  getWelcomeMessage(){
    console.log(this.welcomeDataService.executeHelloWorldBeanService());
    this.welcomeDataService.executeHelloWorldBeanService().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
  }

  handleSuccessfulResponse(response){
    this.welcomeMessage = response.message;
  }

  handleErrorResponse(error){
    this.welcomeMessage = error.error.message;
  }

  getWelcomeWithParams(){
    console.log(this.welcomeDataService.executeHelloWorldWithParams(this.username));
    this.welcomeDataService.executeHelloWorldWithParams(this.username).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    )
  }
}
