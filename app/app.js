'use scrict'

var app = angular.module('IGFSite', ['ngLoadingSpinner']);

app.controller('indexController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

    $scope.processando = false;

    $scope.enviarEmail = function (Email) {

        $scope.processando = true;

        if (Email.RemetenteNome != undefined && Email.RemetenteEmail != undefined && Email.RemetenteNome != null && Email.RemetenteEmail != null && Email.RemetenteCep != null && Email.Telefone != null && Email.RemetenteCpf != null) {

            Email.Assunto = "Cursos Odontológicos - Pré-Matricula de: " + Email.RemetenteEmail;

            Email.Body = "Nome: " + Email.RemetenteNome + "Email: " + Email.RemetenteEmail + "Telefone: " + Email.RemetenteTelefone + "Endereço: " + Email.RemetenteEndereco + "CPF: " + Email.RemetenteCpf;

            Email.DestinatariosEmails = "teste@teste.com.br";

            var servidor = 'Coloque a URL do Servidor Aqui';

            $http.post(servidor, Email)
                .success(function (data, status) {
                    alert("E-mail enviado.");
                    $scope.processando = false;
                }).error(function (data, status) {
                    alert("Erro ao enviar o e-mail. Tente novamente mais tarde.");
                    $scope.processando = false;
                });
        }
        else {
            alert("Existem campos não preenchidos");
            $scope.processando = false;
        };
    }


    $scope.enviarWhatsApp = function (Email, curso) {

       if (Email.RemetenteNome != null && Email.RemetenteCpf != null && Email.RemetenteRg != null && Email.RemetenteEmail != null) {

           $scope.urlWhats = "https://api.whatsapp.com/send?phone=5511982884808&text=Estou%20Interessado%20no%20Curso%3A%20" + encodeURI(curso) + "%0DNome%3A%20" + Email.RemetenteNome + "%0DCPF%3A%20" + Email.RemetenteCpf + "%0DRG%3A%20" + Email.RemetenteRg + "%0DEmail%3A%20" + Email.RemetenteEmail + "%0DNascimento%3A%20" + Email.DataNascimento + "%0DWhatsApp%3A%20" + Email.RemetenteTelefone + "%0DCep%3A%20" + Email.RemetenteCep;
           window.open($scope.urlWhats);
           $scope.Email = {};
           $('#myModal').modal('hide');
       }
        else {
            alert("Existem campos não preenchidos");
           $scope.processando = false;
        };
    }
    $scope.mostarModal = function () {
    $('#myModal').modal('show')
    }
}]);

