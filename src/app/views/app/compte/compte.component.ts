import { Terrain } from "src/app/shared/models/terrain.model";
import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { NotificationsService, NotificationType } from "angular2-notifications";
import { Complexe } from "src/app/shared/models/complexe.model";
import { User } from "src/app/shared/models/user.model";
import { AuthenticationService } from "src/app/shared/services/authentication.service";
import { TerrainService } from "src/app/shared/services/terrain.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-compte",
  templateUrl: "./compte.component.html",
  styleUrls: ["./compte.component.scss"],
})
export class CompteComponent implements OnInit {
  nomTerrain: { [key: string]: Object }[];
  fields: Object = { text: "name", value: "id" };
  ListTerrain: Terrain[] = new Array<Terrain>();
  frais: number = 0;
  buttonFraisDisabled: boolean = false;
  buttonFraisState: string = "";
  constructor(
    private authenticationService: AuthenticationService,
    private titleService: Title,
    private notificationsService: NotificationsService,
    private terrainService: TerrainService
  ) {}

  profile: User = new User();
  complexe: Complexe = new Complexe();
  imageSrc = "/assets/imgs/garkLOGO.png";
  isMeridian = true;
  ngOnInit(): void {
    this.titleService.setTitle("Mon Compte | GARK");

    this.terrainService.getAll().subscribe(
      (res) => {
        this.ListTerrain = res["terrain"] as Terrain[];
        // this.resMobile.EndTime = this.resMobile.StartTime.addMinutes(this.terrain.duration);
        this.nomTerrain = this.ListTerrain.map((el: Terrain) => {
          return {
            name: el.name,
            id: el._id,
            address: el.address,
            color: el.color,
            image: el.image,
            frais: el.frais,
            user: el.user,
            duration: el.duration,
          };
        });
      },
      (err) => {},
      () => {}
    );

    this.authenticationService.getProfile().subscribe((res) => {
      this.profile = res as User;
      ////console.log(this.profile);

      this.profile.password = "";
      if (this.profile["profile"]) {
        if (this.profile["profile"]["picture"]) {
          this.imageSrc =
            `${environment.backend}images/profiles/${this.profile["profile"]["picture"]}` ||
            "/assets/imgs/garkLOGO.png";
        }
      }
    });
    this.terrainService.getComplexe().subscribe((res) => {
      this.complexe = res as Complexe;
      if (this.complexe == null) {
        this.complexe = new Complexe();
      }
    });
  }

  selectedTerrain: Terrain = new Terrain();
  terrainHasChanged(event) {
    this.selectedTerrain = event["itemData"] as Terrain;
    this.terrainService.findOne(event["itemData"]["id"]).subscribe(
      (res) => {
        this.selectedTerrain.frais = res["terrain"]["frais"] as number;
      },
      (err) => {}
    );
  }

  updatefraisduterrain() {
    if (!Object.keys(this.selectedTerrain).length) {
      this.notificationsService.create(
        "Error",
        "veuillez selectionner votre terrain",
        NotificationType.Bare,
        { theClass: "outline primary", timeOut: 6000, showProgressBar: false }
      );
      return;
    }
    this.buttonFraisDisabled = true;
    this.buttonFraisState = "show-spinner";
    this.terrainService
      .update(this.selectedTerrain, this.selectedTerrain["id"])
      .subscribe(
        (res) => {
          this.notificationsService.create(
            "Succès",
            "Frais de reservation mis à jour avec succès",
            NotificationType.Bare,
            {
              theClass: "outline primary",
              timeOut: 6000,
              showProgressBar: false,
            }
          );
          this.buttonFraisDisabled = false;
          this.buttonFraisState = "";
        },
        (err) => {
          console.log(err);

          this.notificationsService.create(
            "Erreur",
            "Une erreur a survenue lors du mis à jour du frais",
            NotificationType.Bare,
            {
              theClass: "outline primary",
              timeOut: 6000,
              showProgressBar: false,
            }
          );
          this.buttonFraisDisabled = false;
          this.buttonFraisState = "";
        }
      );
  }

  isImageUploadLoading: boolean = false;

  imageSelected(evt) {
    if (!evt.target.files) {
      return;
    }
    this.isImageUploadLoading = true;
    const image = evt.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);

    this.authenticationService.updateProfileImage(formData).subscribe(
      (res) => {
        this.isImageUploadLoading = false;
        this.notificationsService.create(
          "Succès",
          "Photo de profile mis à jour avec succès",
          NotificationType.Bare,
          { theClass: "outline primary", timeOut: 6000, showProgressBar: false }
        );
        this.imageSrc =
          `${environment.backend}images/profiles/${res["profile"]["picture"]}` ||
          "https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png";
      },
      (err) => {
        this.isImageUploadLoading = false;
        this.notificationsService.create(
          "Erreur",
          "Une erreur a survenue lors du téléchargement de votre photo de profile",
          NotificationType.Bare,
          { theClass: "outline primary", timeOut: 6000, showProgressBar: false }
        );
      }
    );
  }

  openModifyAccount() {
    if (
      document
        .querySelector("#update-btn")
        .classList.contains("flaticon-setting-lines")
    ) {
      (<HTMLInputElement>document.querySelector("#last-name")).value =
        this.profile.profile.lastName;
      document
        .querySelector("#update-btn")
        .classList.remove("flaticon-setting-lines");
      document.querySelector("#update-btn").classList.add("simple-icon-close");
      (<HTMLElement>document.querySelector("#show-details")).style.display =
        "none";
      (<HTMLElement>document.querySelector("#show-forms")).style.display =
        "block";
    } else {
      document
        .querySelector("#update-btn")
        .classList.remove("simple-icon-close");
      document
        .querySelector("#update-btn")
        .classList.add("flaticon-setting-lines");
      (<HTMLElement>document.querySelector("#show-details")).style.display =
        "block";
      (<HTMLElement>document.querySelector("#show-forms")).style.display =
        "none";
    }
  }

  openModifyComplexe() {
    if (
      document
        .querySelector("#update-complexe-btn")
        .classList.contains("flaticon-setting-lines")
    ) {
      let open = this.complexe.opening.split("H");
      let close = this.complexe.closing.split("H");

      this.complexe.opening = new Date(
        2020,
        11,
        1,
        +open[0],
        +open[1]
      ).toString();
      this.complexe.closing = new Date(
        2020,
        11,
        1,
        +close[0],
        +close[1]
      ).toString();

      //this.complexe.opening = new Date().setHours(+open);
      document
        .querySelector("#update-complexe-btn")
        .classList.remove("flaticon-setting-lines");
      document
        .querySelector("#update-complexe-btn")
        .classList.add("simple-icon-close");
      (<HTMLElement>document.querySelector("#show-terrain")).style.display =
        "none";
      (<HTMLElement>(
        document.querySelector("#show-complexe-form")
      )).style.display = "block";
    } else {
      document
        .querySelector("#update-complexe-btn")
        .classList.remove("simple-icon-close");
      document
        .querySelector("#update-complexe-btn")
        .classList.add("flaticon-setting-lines");
      (<HTMLElement>document.querySelector("#show-terrain")).style.display =
        "block";
      (<HTMLElement>(
        document.querySelector("#show-complexe-form")
      )).style.display = "none";

      if (<any>this.complexe.opening instanceof Date) {
        this.complexe.opening = this.formatDate(
          new Date(this.complexe.opening)
        );
        this.complexe.closing = this.formatDate(
          new Date(this.complexe.closing)
        );
      }
    }
  }

  buttonDisabled: boolean = false;
  buttonState: string = "";

  UpdateProfile() {
    this.buttonDisabled = true;
    this.buttonState = "show-spinner";
    this.authenticationService.updateProfile(this.profile).subscribe(
      (res) => {
        this.buttonDisabled = false;
        this.buttonState = "";
        if (res["updated"] == true) {
          this.notificationsService.create(
            "Succès",
            "Profil mis à jour avec succès",
            NotificationType.Bare,
            {
              theClass: "outline primary",
              timeOut: 2000,
              showProgressBar: false,
            }
          );
        }
        setTimeout(() => {
          this.openModifyAccount();
        }, 1000);
      },
      (err) => {
        this.buttonDisabled = false;
        this.buttonState = "";
        this.notificationsService.create(
          "Erreur",
          err["error"]["Message"] ||
            "Une erreur a survenue, veuillez réessayer",
          NotificationType.Bare,
          { theClass: "outline primary", timeOut: 2000, showProgressBar: false }
        );
      }
    );
  }

  oldPassword: string = "";
  newPassword: string = "";
  confirmPassword: string = "";
  buttonPasswordDisabled: boolean = false;
  buttonPasswordState: string = "";

  updatePassword() {
    if (this.oldPassword == "" || this.newPassword == "") {
      return;
    }

    this.buttonPasswordDisabled = true;
    this.buttonPasswordState = "show-spinner";

    this.authenticationService
      .updatePassword(this.oldPassword, this.newPassword)
      .subscribe(
        (res) => {
          if (res["updated"] == false) {
            this.notificationsService.create(
              "Erreur",
              res["Message"],
              NotificationType.Bare,
              {
                theClass: "outline primary",
                timeOut: 6000,
                showProgressBar: false,
              }
            );
          } else {
            this.notificationsService.create(
              "Succès",
              res["Message"],
              NotificationType.Bare,
              {
                theClass: "outline primary",
                timeOut: 6000,
                showProgressBar: false,
              }
            );
          }
          this.oldPassword = "";
          this.newPassword = "";
          this.confirmPassword = "";
          this.buttonPasswordDisabled = false;
          this.buttonPasswordState = "";
        },
        (err) => {
          this.notificationsService.create(
            "Erreur",
            "Une erreur s'est produite lors de la mise à jour de votre mot de passe",
            NotificationType.Bare,
            {
              theClass: "outline primary",
              timeOut: 6000,
              showProgressBar: false,
            }
          );
          this.buttonPasswordDisabled = false;
          this.buttonPasswordState = "";
        }
      );
  }

  defaultImage() {
    this.imageSrc = "/assets/imgs/garkLOGO.png";
  }
  buttonComplexeDisabled: boolean = false;
  buttonComplexeState: string = "";

  UpdateComplexe() {
    let opening = this.formatDate(this.complexe.opening);
    let closing = this.formatDate(this.complexe.closing);

    this.complexe.opening = opening;
    this.complexe.closing = closing;
    this.buttonComplexeDisabled = true;
    this.buttonComplexeState = "show-spinner";
    this.terrainService.updateComplexe(this.complexe).subscribe(
      (res) => {
        this.buttonComplexeDisabled = false;
        this.buttonComplexeState = "";
        if (res["updated"] == false) {
          this.notificationsService.create(
            "Info",
            res["Message"],
            NotificationType.Bare,
            {
              theClass: "outline primary",
              timeOut: 2000,
              showProgressBar: false,
            }
          );
        } else {
          this.notificationsService.create(
            "Succès",
            res["Message"],
            NotificationType.Bare,
            {
              theClass: "outline primary",
              timeOut: 2000,
              showProgressBar: false,
            }
          );
          this.complexe = res["complexe"] as Complexe;
        }
        setTimeout(() => {
          this.openModifyComplexe();
        }, 1000);
      },
      (err) => {
        this.buttonComplexeDisabled = false;
        this.buttonComplexeState = "";
        this.notificationsService.create(
          "Erreur",
          err["error"]["Message"] ||
            "Une erreur a survenue, veuillez réessayer",
          NotificationType.Bare,
          { theClass: "outline primary", timeOut: 2000, showProgressBar: false }
        );
      }
    );
  }

  formatDate(datetime) {
    let date = new Date(datetime);

    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();

    if (+hours < 10) {
      hours = "0" + hours;
    }
    if (+minutes < 10) {
      minutes = "0" + minutes;
    }

    return hours + "H" + minutes;
  }

  confirmIncorrect: boolean = false;
  newChanged() {
    if (this.newPassword !== this.confirmPassword) {
      this.confirmIncorrect = true;
      this.buttonPasswordDisabled = true;
    } else {
      this.confirmIncorrect = false;
      this.buttonPasswordDisabled = false;
    }
  }

  confirmChanged() {
    if (this.newPassword !== this.confirmPassword) {
      this.confirmIncorrect = true;
      this.buttonPasswordDisabled = false;
    } else {
      this.confirmIncorrect = false;
      this.buttonPasswordDisabled = false;
    }
  }
}
