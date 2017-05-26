import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { blankModel, User, UserAddressGeo } from '../../../models/user.model'
import { UserService } from '../../../shared/api/user/user.service'
import * as presenterHelpers from '../../components/user-detail/user-detail.presenter'

@Component({
  moduleId: module.id,
  selector: 'user-detail',
  templateUrl: 'user-detail.component.html',
  styleUrls: [ 'user-detail.component.css' ],
})
export class UserDetailComponent implements OnInit {
  /** User or Empty Model */
  public user: User = null
  public readonly presenter = presenterHelpers
  /** Для операции update для input[readonly] */
  public readonlyFields = [ 'id', 'lat', 'lng' ]

  public personalProperties: Object[]
  public companyProperties: Object[]
  public locationProperties: Object[]
  public locationGeoProperties: Object[]

  private personaFieldGroup = [ 'id', 'name', 'username', 'email', 'phone', 'website' ]
  private readonly companyFieldGroup = [ 'name', 'catchPhrase', 'bs' ]
  private readonly locationFieldGroup = [ 'street', 'suite', 'city', 'zipcode' ]
  private readonly locationGeoFieldGroup = [ 'lat', 'lng' ]

  private operation: 'create' | 'update'


  constructor (private _activatedRoute: ActivatedRoute,
               private _userService: UserService,
               private _cd: ChangeDetectorRef) {
  }

  ngOnInit () {
    // получаем требуемый тип операции (см. роутеры)
    this.operation = this._activatedRoute.snapshot.data.operation

    console.log(this.operation)
    // дополнительные настройки для операций
    if (this.isCreateOperation) {
      // создаем blank модель
      this.user = blankModel
      // для операции create поле id не требуется
      const index = this.personaFieldGroup.indexOf('id')
      delete this.personaFieldGroup[ index ]

      // для операции create все поля должны быть доступны
      this.readonlyFields = []

      // вычленяем отдельные свойства сабмоделей для упрощение работы во view
      this.buildScopeProperties()
    }

    if (this.isUpdateOperation) {
      // подтягиваем существующую модель
      // todo: похорошему нужно это перенести в слой роутера,
      // который подготавливает вход в маршрут и там проверить id,
      // подтянуть модель и передать в компонент или обработать
      // отсутсвие модели
      this._activatedRoute.params.forEach((params: Params) => {
        const id = +params[ 'id' ]

        this._userService.get(id).subscribe(
          (user: User) => {
            this.user = user

            // вычленяем отдельные свойства сабмоделей для упрощение работы во view
            this.buildScopeProperties()
          },
        )
      })
    }
  }

  onUpdate (): void {
    this._userService.update(this.user.id, this.user).subscribe(
      () => alert('was updated'),
      (err) => alert(err),
    )
  }

  onCreate (): void {
    this._userService.create(this.user).subscribe(
      () => alert('was created'),
      (err) => alert(err),
    )
  }

  onUpdateMarketPosition (coords: UserAddressGeo): void {
    this.user.address.geo = coords
    this._cd.detectChanges()
  }

  private getScopeProperties (object: { [key: string]: any },
                              requiredProperties: string[]): { key: string, value: any }[] {
    const result: { key: string, value: any }[] = []

    Object.keys(object).forEach((property: string) => {
      if (requiredProperties.includes(property)) {
        result.push({ key: property, value: object[ property ] })
      }
    })

    return result
  }

  private buildScopeProperties (): void {
    this.personalProperties = this.getScopeProperties(this.user, this.personaFieldGroup)
    this.companyProperties = this.getScopeProperties(this.user.company, this.companyFieldGroup)
    this.locationProperties = this.getScopeProperties(this.user.address, this.locationFieldGroup)
    this.locationGeoProperties = this.getScopeProperties(this.user.address.geo, this.locationGeoFieldGroup)
  }

  get isCreateOperation (): boolean {
    return this.operation === 'create'
  }

  get isUpdateOperation (): boolean {
    return this.operation === 'update'
  }
}
