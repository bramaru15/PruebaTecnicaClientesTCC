import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { NgForm } from '@angular/forms';
import { Client } from 'src/app/models/cliente';

declare var M: any;

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  providers: [ ClienteService ]
})

export class ClienteComponent implements OnInit {
  selectedClient: Client;
   clients: Client[];
   errorMessage: string = '';
   edit: boolean = false;
   alert: {
    show: boolean
    message: string
    shape: string
   } = {
    show: false,
    message: '',
    shape: ''
   }

    constructor(private clientService: ClienteService) { 
       this.clients = [];
       this.selectedClient = new Client();
    }
  
    ngOnInit() {
      this.getClients();
    }
  
    addClient(form?: NgForm) {
      const { Documento, Nombres, Genero, NombreDocumento } = form?.value;
      const client = new Client(Documento, Nombres, Genero, NombreDocumento)
      this.clientService.save(client)
      .subscribe(res => {
        this.getClients();
        this.resetForm(form);
        this.alert.show = true
        this.alert.message = 'Saved successfully'
        this.alert.shape = 'bg-success text-white'
        setTimeout(() => {
          this.alert.show = false
        }, 1000);
      }, error => {
        this.errorMessage = error.error.mensaje.errors?.[0]
      });
    }

    editClient(client: Client){
      this.edit = true
      this.selectedClient.document = client.document
      this.selectedClient.name = client.name
      this.selectedClient.documentType = client.documentType
      this.selectedClient.genre = client.genre

    }

    updateClient(form: NgForm){
      const { Documento, Nombres, Genero, NombreDocumento } = form?.value;
      const client = new Client(Documento, Nombres, Genero, NombreDocumento)
      this.clientService.update(Documento, client)
      .subscribe(res => {
        this.getClients();
        this.resetForm(form);
        this.edit = false
        this.alert.show = true
        this.alert.message = 'Updated successfully'
        this.alert.shape = 'bg-primary text-white'
        setTimeout(() => {
          this.alert.show = false
        }, 1000);
      });
    }
  
    getClients() {
      this.clientService.getClients()
        .subscribe(res => {
          this.clients = res.clients as Client[];
        });
    }
  
    deleteClient(_id: string, form: NgForm) {
      if(confirm('Are you sure you want to delete it?')) {
        this.clientService.delete(_id)
          .subscribe((res:any) => {
            this.getClients();
            this.resetForm(form);
            this.alert.show = true
            this.alert.message = 'Deleted successfully'
            this.alert.shape = 'bg-danger text-white'
            setTimeout(() => {
              this.alert.show = false
            }, 1000);
          });
      }
    }
  
    resetForm(form?: NgForm) {
      if (form) {
        form?.reset();
        this.selectedClient = new Client();
      }
    }  

    closeEdit(form?: NgForm){
      this.edit = false
      this.resetForm(form)
    }
}
