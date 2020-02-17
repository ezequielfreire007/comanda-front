import { Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef   } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Directive({
  selector: '[appValidarRoles]'
})
export class ValidarRolesDirective implements OnInit{

  private rolesAdminitdos: string[];

  @Input() set appValidarRoles( value: string[]) {
    this.rolesAdminitdos = value;
  }

  constructor(
    private elementRef: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private jwt: JwtHelperService
  ) {}

  ngOnInit() {
    if (this.checkRoles()) {
    this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
    this.viewContainer.clear();
    }
  }

  private checkRoles(): boolean {
    let retorno = false;
    const token = localStorage.getItem('token');
    const tokenData = this.jwt.decodeToken(token);

    if (this.rolesAdminitdos && tokenData) {
      const tipoUsuario = tokenData['tipo'];
      this.rolesAdminitdos.map( element => {
        if ( tipoUsuario === element) {
          retorno = true;
        }
      });
    }

    return retorno;
  }
}
