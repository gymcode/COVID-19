import React , {useState} from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import Country from '../screens/CountryScreen';
import {Ionicons} from '@expo/vector-icons'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks';

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

const Settings = ()=>{
    const [isAddMode, setIsAddMode] = useState(false);
    const [country, setCountry] = useState({
        "country": "Ghana",
        "countryInfo": {
          "_id": "288",
          "lat": 8,
          "long": -2,
          "flag": "https://corona.lmao.ninja/assets/img/flags/gh.png",
          "iso3": "GHA",
          "iso2": "GH"
        },
        "continent": "Africa",
        "result": {
          "tests": 100622,
          "cases": 1550,
          "todayCases": 0,
          "deaths": 11,
          "todayDeaths": 0,
          "recovered": 155,
          "active": 1384,
          "critical": 4,
          "casesPerOneMillion": 50,
          "deathsPerOneMillion": 0,
          "testsPerOneMillion": 3238,
          "updated": "2020-04-27T21:26:42.062Z"
        }
    });
    const {loading, error, data} = useQuery(getCountriesQuery);
    data.countries.map((deaths)=>{
        console.log(deaths.result.deaths)
    })



    const cancel = ()=>{
        setIsAddMode(false)
    }

    return(
        <View style={styles.main}>
           
            {/* worldwide statistics */}
            <View style={styles.world}>
                <View style={{flexDirection: "row"}}>
                    <View style={{flex:1}}>
                        <Ionicons
                            name="ios-globe"
                            size={30}
                            color="#033bb2"
                        />
                    </View>
                    <View style={{flex:7, marginTop: 4}}>
                        <Text style={{ fontSize: 20}}>Worldwide Statistics</Text>
                    </View>
                </View>

                <View style={{flexDirection: "row"}}>
                    {/* confirmed  view */}
                    <View style={styles.worldSection}>
                        <View>
                            <Text style={{color: "#800080", fontSize: 16}}>Confirmed</Text>
                            <Text style={{fontSize: 27}}>fsdfsfsf</Text>
                        </View>
                    </View>
                    {/* recovered view */}
                    <View style={styles.worldSection}>
                        <View>
                            <Text style={{color: "green", fontSize: 16}}>Recovered</Text>
                            <Text style={{fontSize: 27}}>fsdfsfsf</Text>
                        </View>
                    </View> 
                    {/* Death View */}
                    <View style={styles.worldSection}>
                        <View>
                            <Text style={{color: "red", fontSize: 16}}>Deaths</Text>
                            <Text style={{fontSize: 27}}>fsdfsfsf</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* select country section */}
            <View style={styles.select_country}>
                <Text>Select country:</Text>
                <TouchableOpacity onPress={()=>{setIsAddMode(true)}}>
                    <View style={styles.options}>

                        <View style={{ flexDirection: "row"}}>
                            <View style={{justifyContent: "center"}}>
                                <Text>jdnfs</Text>
                            </View>
                            <View style={{justifyContent: "center"}}>
                                <Text style={{fontSize: 15}}>{console.log(country)}</Text>
                            </View>
                        </View>
                        {/* drop down */}
                        <View style={{justifyContent: "center"}}>
                            <Ionicons
                            name="ios-arrow-down"
                            size={18}
                            />
                        </View>

                    </View>
                </TouchableOpacity>
            </View>

            {/* modal */}
            
            <Country visible={isAddMode} Cancel={()=>{cancel()}}/>
            

            {/* statistics for specific countries */}
            <View style={styles.statistic}>
                    <View style={{flexDirection: "row"}}>
                            <View style={{flex:1}}>
                               <Ionicons
                               name="ios-stats"
                               size={30}
                               color="#7aeb7a"
                               />
                            </View>
                            <View style={{flex:7, marginTop: 5}}>
                                <Text style={{ fontSize: 20}}>Statistics</Text>
                            </View>
                    </View>

                <View style={{flexDirection: "row", marginTop: 17}}>
                   <View style={{flexDirection: "column", flex:2, borderRightWidth: .3, borderRightColor: "#e3e3e3"}}>
                       <View>
                            <Text style={{color: "#800080", fontSize: 16}}>Confirmed</Text>
                            <Text>fsdfsdfsd</Text>
                       </View>
                       <View style={{marginTop: 20}}>
                            <Text style={{color: "yellow", fontSize: 16}}>Active</Text>
                            <Text>fsdfsdfsd</Text>
                       </View>
                   </View>
                   <View style={{flexDirection: "column", flex:2, marginLeft: 10,  borderRightWidth: .3, borderRightColor: "#e3e3e3"}}>
                       <View>
                            <Text style={{color: "green", fontSize: 16}}>Recovered</Text>
                            <Text>fsdfsdfsd</Text>
                       </View>
                       <View style={{marginTop: 20}}>
                            <Text style={{color: "red", fontSize: 16}}>Critical</Text>
                            <Text>fsdfsdfsd</Text>
                       </View>
                   </View>
                   <View style={{flexDirection: "column",flex:2, marginLeft: 10}}>
                       <View>
                            <Text style={{color: "red", fontSize: 16}}>Deaths</Text>
                            <Text>fsdfsdfsd</Text>
                       </View>
                       <View style={{marginTop: 20}}>
                            <Text style={{color: "#b300b3", fontSize: 16}}>Tests</Text>
                            <Text>fsdfsdfsd</Text>
                       </View>
                   </View>
                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        padding: 10,
        flex: 1,
        backgroundColor: "whitesmoke"
    }, 
    world: {
        padding: 15,
        flexDirection: "column",
        height: 130,
        backgroundColor: "#fff", 
        width: 350,
        borderRadius: 5,
        shadowColor: '#000', 
        shadowOffset: {width: 0, height: 1},
        shadowOpacity:0.1,

    }, 
    worldSection: {
        marginTop: 18,
        marginLeft: 10,
        flex: 2,
        justifyContent: "center",
        borderRightWidth: .5, 
        borderRightColor: "#e3e3e3"

    },

    select_country: {
        marginTop: 30, 
        padding: 3
    }, 

    options: {
        padding: 15,
        justifyContent: "space-between",
        marginVertical: 5,
        flexDirection: "row",
        height: 55,
        backgroundColor: "#fff", 
        width: 350,
        borderRadius: 5,
        shadowColor: '#000', 
        shadowOffset: {width: 0, height: 1},
        shadowOpacity:0.1,
    },

    statistic:{
        padding: 15,
        marginTop: 4,
        flexDirection: "column",
        height: 170,
        backgroundColor: "#fff", 
        width: 350,
        borderRadius: 5,
        shadowColor: '#000', 
        shadowOffset: {width: 0, height: 1},
        shadowOpacity:0.1,
    }





})


export default Settings;