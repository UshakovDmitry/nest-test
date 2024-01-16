    <div class="form-component__body">

      <company-fields-step
        v-if="_first_step && !_second_step && !_third_step"
        @changeBIN="(value:string) => bin = value"
        @changeCompanyName="(value:string) => company_name = value"
        @changeLegalAddress="(value:string) => legal_address = value"
        @changeBIC="(value:string) => bic = value"
        @changeBankName="(value:string) =>bank_name = value"
        @changeIBAN="(value:string) => iban = value"
        @changeCBE="(value:string) => cbe = value"
        @changeDirectorName="(value:string) => director_name = value"
        @changeDirectorPhoneNumber="(value:string) => director_phone_number = value"
        @validate="(value:boolean) => btn_state_step1 = value"
      ></company-fields-step>
      
      <person-fields-step
        v-if="_second_step && !_first_step && !_third_step"
        @changeUserName="(value:string) => user_name = value"
        @changeUserSurname="(value:string) => user_surname = value"
        @changePhoneNumber="(value:string) => phone_number = value"
        @changeEmail="(value:string) => email = value"
        @changeJobTitle="(value:string) => job_title = value"
        @changePassword="(value:string) => password = value"
        @changePasswordConfirmation="(value:string) => password_confirmation = value"
        @validForm="(value:boolean) => btn_step2 = value"
      ></person-fields-step>

      <success-step v-if="_third_step && !_first_step && !_second_step"></success-step>
    </div>
