import SignupFactory from "../factories/SignupFactory";
import signupPage from "../pages/SignupPage";

describe("SignUp", () => {
  // before(function() {
  //   cy.log('Tudo aqui e executado uma única vez ANTES de Todos os casos de testes')
  // })

  // beforeEach(() => {
  //   cy.fixture("deliver").then((deliver) => (this.deliver = deliver));
  // });

  // after(()=> {
  //   cy.log('Tudo aqui e executado uma única vez DEPOIS de Todos os casos de testes')
  // })

  // afterEach(()=> {
  //   cy.log('Tudo aqui e executado DEPOIS de todo caso de teste')
  // })

  it("User should be deliver", () => {
    const deliver = SignupFactory.deliver();
    signupPage.go();
    signupPage.fillForm(deliver);
    signupPage.submit();

    const expectedMessage =
      "Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.";
    signupPage.modalContentShouldBe(expectedMessage);
  });

  it("This document should be incorrect", () => {
    const deliver = SignupFactory.deliver();
    signupPage.go();
    signupPage.fillForm({ ...deliver, cpf: "345997948AA" });
    signupPage.submit();
    signupPage.alertMessageShouldBe("Oops! CPF inválido");
  });

  it("This E-mail should be incorrect", () => {
    const deliver = SignupFactory.deliver();
    signupPage.go();
    signupPage.fillForm({ ...deliver, email: "invalid_mail.com.br" });
    signupPage.submit();
    signupPage.alertMessageShouldBe("Oops! Email com formato inválido.");
  });

  context("Required Fields", () => {
    const messages = [
      {
        field: "name",
        output: "É necessário informar o nome",
      },
      {
        field: "cpf",
        output: "É necessário informar o CPF",
      },
      {
        field: "email",
        output: "É necessário informar o email",
      },
      {
        field: "postalcode",
        output: "É necessário informar o CEP",
      },
      {
        field: "number",
        output: "É necessário informar o número do endereço",
      },
      {
        field: "delivery_method",
        output: "Selecione o método de entrega",
      },
      {
        field: "cnh",
        output: "Adicione uma foto da sua CNH",
      },
    ];

    before(() => {
      signupPage.go();
      signupPage.submit();
    });
    messages.forEach((msg) => {
      it(`${msg.field} is required`, () => {
        signupPage.alertMessageShouldBe(msg.output);
      });
    });
  });
});
