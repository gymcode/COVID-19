import React from  'react';
import {View, Text, Modal, TouchableOpacity, FlatList, Image} from 'react-native';
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks';
import {Entypo, Ionicons} from '@expo/vector-icons'

const getCountriesQuery = gql`
{
    countries{
        country
        countryInfo{
            _id
            lat
            long
            flag
            iso3
            iso2
        }
        continent
        result {
            tests
            cases
            todayCases
            deaths
            todayDeaths
            recovered
            active
            critical
            casesPerOneMillion
            deathsPerOneMillion
            testsPerOneMillion
            updated
        }
    }
}
`;

  const ListItem = ({name, flag})=>{
    return(
      <View style={{flexDirection: "row",borderBottomWidth: .3, height: 50, borderBottomColor: "#e3e3e3"}}>
         <View style={{flex:1, paddingVertical:17}}>
            <Image source={flag} style={{width: 30, height: 20}}/>
        </View>
        <View style={{flex: 8, flexDirection: "row", paddingVertical: 17, marginLeft: 15}}>
          <View>
              <Text style={{fontSize: 15}}>{name}</Text>
          </View>
        </View>
      </View>
    )
  }

const Country = ({visible, Cancel})=>{

    const {loading, error, data} = useQuery(getCountriesQuery);

    const listData = data.countries
    

    return(
        <Modal visible={visible}>
            <View style={{marginTop: 40, padding: 10}}>
                <TouchableOpacity onPress={Cancel}>
                    <Ionicons
                    name="ios-close"
                    size={30}
                    />
                </TouchableOpacity>

                <View style={{marginTop: 30}}>
                    <View style={{flexDirection: "row"}}>
                    <FlatList
                            data={listData}
                            renderItem={({item})=> <ListItem name={item.country} flag={{uri: item.countryInfo.flag}}/>}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default Country