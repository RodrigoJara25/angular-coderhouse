import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginComponent } from "./login.component";

describe('Test Login Component', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.loginForm.value).toEqual({
      email: 'rodrigo@gmail.com',
      password: '1234'
    });
  });

  it('should mark the form as invalid if the inputs are empty', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should mark the form as invalid if password is less than 3 characters', () => {
    component.loginForm.setValue({email: 'rodrigo@gmail.com', password: 'a1354'});
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should call authService.login and navigate to dashboard if the form is valid', () => {
    const authServiceSpy = spyOn(component['authService'], 'login').and.returnValue(true);
    const routerSpy = spyOn(component['router'], 'navigate');
    component.loginForm.setValue({email: 'rodrigo@gmail.com', password: '1234'});
    component.submit();
    expect(authServiceSpy).toHaveBeenCalledWith('rodrigo@gmail.com' , '1234');
    expect(routerSpy).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should show an alert if login fails', () => {
    const authServiceSpy = spyOn(component['authService'], 'login').and.returnValue(false);
    const alertSpy = spyOn(window, 'alert');
    component.loginForm.setValue({email: 'rodrigo@gmail.com', password: '1234'});
    component.submit();
    expect(alertSpy).toHaveBeenCalledWith('Email o contraseña incorrectos');
  });

});