import { Component } from '@angular/core';

import { ProfilePage } from '../profile/profile';
import { ContactsPage } from '../contacts/contacts';
import { ChatsPage } from '../chats/chats';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage { 

  tab1Root = ProfilePage;
  tab2Root = ContactsPage;
  tab3Root = ChatsPage;
  tab4Root = SettingsPage;

  constructor() {

  }
}
